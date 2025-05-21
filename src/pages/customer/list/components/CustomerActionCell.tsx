import type { TOnToggleProps } from '@/components/DropdownComponent'
import DropdownComponent from '@/components/DropdownComponent'
import type { Customer } from '@/types/customer/customer.type.data'
import { ALLOWED_ALL_ACCESS, ROLES } from '@/types/role'
import type { Row, Table } from '@tanstack/react-table'

const CustomerActionCell = ({
  row,
  table,
  onToggle,
}: {
  row: Row<Customer>
  table: Table<Customer>
  onToggle: (type: TOnToggleProps) => void
}) => {
  const handleToggle = async (type: TOnToggleProps) => {
    await table.toggleAllPageRowsSelected(false)
    row.toggleSelected()
    onToggle(type)
  }

  return (
    <DropdownComponent
      allowedRoles={{
        edit: [ROLES.SALES_ADMIN, ROLES.ADMIN],
        details: ALLOWED_ALL_ACCESS,
        remove: [ROLES.ADMIN],
      }}
      onToggle={handleToggle}
    />
  )
}

export default CustomerActionCell
