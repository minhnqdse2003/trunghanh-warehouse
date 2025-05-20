export const roleConfig = [
  { key: 'ADMIN', id: 1, name: 'Admin' },
  { key: 'INVENTORY_MANAGER', id: 2, name: 'Inventory Manager' },
  { key: 'ACCOUNTANT', id: 3, name: 'Accountant' },
  { key: 'SALES_ADMIN', id: 4, name: 'Sale Admin' },
  { key: 'DIRECTOR', id: 5, name: 'Director' },
] as const

export type RoleKey = (typeof roleConfig)[number]['key']
export type RoleId = (typeof roleConfig)[number]['id']

export const ROLES: Record<RoleKey, number> = Object.fromEntries(
  roleConfig.map(({ key, id }) => [key, id]),
) as Record<RoleKey, number>

export const ALLOWED_ALL_ACCESS = [
  ROLES.ACCOUNTANT,
  ROLES.ADMIN,
  ROLES.DIRECTOR,
  ROLES.INVENTORY_MANAGER,
  ROLES.SALES_ADMIN,
]

export const ROLES_NAME: Record<RoleKey, string> = Object.fromEntries(
  roleConfig.map(({ key, name }) => [key, name]),
) as Record<RoleKey, string>
