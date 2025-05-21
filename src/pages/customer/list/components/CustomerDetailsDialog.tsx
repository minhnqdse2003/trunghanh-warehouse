import DescriptionComponent, {
  itemSpacing,
  type IDescriptionColumns,
} from '@/components/Description'
import EmailLink from '@/components/EmailLink'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import type { IBaseDialogProps } from '@/types/base-dialog.type'
import type { Customer } from '@/types/customer/customer.type.data'
import { matchCustomerLoyalColor } from '@/utils/matchCustomerStatus'
import { Dot, Locate, Mail, PhoneCall } from 'lucide-react'
import { useMemo } from 'react'

const CustomerDetailsDialog = ({
  customer,
  isOpen,
  onClose,
}: IBaseDialogProps<Customer>) => {
  const columns: Array<IDescriptionColumns> = useMemo(
    () =>
      [
        {
          title: 'Email',
          render: (
            <span className='font-medium text-sm grow'>
              <EmailLink email={customer.email} isMobile={false} />
            </span>
          ),
          icon: <Mail />,
        },
        {
          title: 'SĐT',
          render: (
            <span className='font-medium text-sm grow'>
              {customer.phoneNumber || 'N/A'}
            </span>
          ),
          icon: <PhoneCall />,
        },
        {
          title: 'Địa chỉ',
          render: (
            <span className='font-medium text-sm'>
              {customer.address || 'N/A'}
            </span>
          ),
          icon: <Locate />,
        },
      ] as IDescriptionColumns[],
    [customer],
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='dialog-right-side'>
        <DialogHeader>
          <DialogTitle>
            <span className='text-base font-semibold'>
              {`Thông tin khách hàng - ${customer.customerName}`}{' '}
              <Badge className={matchCustomerLoyalColor(customer.isLoyal)}>
                <Dot className='animate-ping' />
                {customer.isLoyal
                  ? 'Khách hàng thân thiết'
                  : 'Khách hàng thường'}
              </Badge>
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={itemSpacing}>
          <DescriptionComponent columns={columns} />
        </div>
        <DialogFooter>
          <Button variant='outline' onClick={onClose}>
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerDetailsDialog
