import type { RoleId } from "../role";
import type { UserInformationData } from "../user/user.type";

export interface AuthenticationInformationData {
  token: string,
  refreshToken: string,
  role: RoleId,
  user:TAuthenticationUserInformation
}

export type TAuthenticationUserInformation = Pick<UserInformationData, "email" | "fullName" | "roleName">