import type { AuthenticationInformationData } from '@/types/auth/auth.type'
import { authQueryClient } from './query-client.auth'
import { QUERY_KEYS } from '@/types/constants/query-keys'
import { ERROR_MESSAGE } from '@/types/constants/error-messages'

export function apiClient<TData = unknown>(
  endpoint: string,
  options?: RequestInit,
  isBlob?: false,
): Promise<TData>
export function apiClient(
  endpoint: string,
  options?: RequestInit,
  isBlob?: true,
): Promise<Blob>

export async function apiClient<TData>(
  endpoint: string,
  options: RequestInit = {},
  isBlob = false,
): Promise<TData | Blob> {
  const authData = authQueryClient.getQueryData<AuthenticationInformationData>([
    QUERY_KEYS.AUTH,
  ])
  const BASE_URL = import.meta.env.VITE_API_BASE_URL

  const defaultHeader = {
    ...(authData?.token && { Authorization: `Bearer ${authData.token}` }),
    ...(isBlob ? {} : { 'content-type': 'application/json' }),
  }

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeader,
      ...options?.headers,
    },
  }

  let response = await fetch(`${BASE_URL}${endpoint}`, config)

  /**Token Expired */
  if (response.status === 401) {
    if (!authData?.refreshToken) {
      throw new Error(ERROR_MESSAGE.NO_REFRESH_TOKEN_AVAILABLE)
    }

    const refreshTokenResponse = await fetch(
      `${BASE_URL}/api/Account/refreshToken`,
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken: authData.refreshToken }),
        headers: {
          'content-type': 'application/json',
        },
      },
    )
    if (!refreshTokenResponse.ok) {
      throw new Error(ERROR_MESSAGE.SESSION_EXPIRED)
    }
    const refreshTokenData: { token: string } =
      await refreshTokenResponse.json()
    authQueryClient.setQueryData(
      [QUERY_KEYS.AUTH],
      (prev: AuthenticationInformationData) =>
        ({
          ...prev,
          token: refreshTokenData.token,
        }) as AuthenticationInformationData,
    )
    config.headers = {
      Authorization: `Bearer ${refreshTokenData.token}`,
      ...options?.headers,
    }
    response = await fetch(`${BASE_URL}${endpoint}`, config)
  }

  /**Forbidden */
  if (response.status === 403) {
    throw new Error(ERROR_MESSAGE.FORBIDDEN)
  }
  /**Already Login */
  if (response.status === 409) {
    throw new Error(ERROR_MESSAGE.ALREADY_LOGGED_IN)
  }

  /**Others error */
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message ?? 'Đã có lỗi xảy ra')
  }

  if (isBlob) {
    return response.blob()
  }

  return response.json() as Promise<TData>
}
