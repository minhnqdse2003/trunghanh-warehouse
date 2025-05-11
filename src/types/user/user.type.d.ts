export interface UserInformationData {
  id:    string;
  userName:             string;
  email:                string;
  fullName:             string;
  phoneNumber:          string;
  roleId:               number;
  roleName:             string;
  status:               string;
  twoFactorEnabled:     boolean;
  phoneNumberConfirmed: boolean;
  emailConfirmed:       boolean;
  accountSettings:      null;
}
