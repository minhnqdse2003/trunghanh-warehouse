export interface RoutesProps {
  key: string
  label: React.ReactNode | string
  icon?: React.ReactNode
  url: string
  element: React.ReactNode
  hidden?: boolean
  index?: boolean
  allowedRoles?: Array<number>
  children?: Array<RoutesProps>
}
