import { roleConfig } from '@/types/role'

export const matchUserRole = (role: string | number) => {
  if (typeof role === 'number') {
    return getRoleAsString(role)?.name ?? 'Vai trò không xác định'
  }
  return getRoleAsNumber(role)?.id ?? 'Vai trò không xác định'
}

const getRoleAsString = (role: number) =>
  roleConfig.find(item => item.id === role)

const getRoleAsNumber = (role: string) =>
  roleConfig.find(item => item.name === role)
