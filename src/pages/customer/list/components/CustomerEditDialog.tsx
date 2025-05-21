import DescriptionComponent, {
  itemSpacing,
  type IDescriptionColumns,
} from '@/components/Description'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { IUpdateCustomer } from '@/services/customer-service'
import type { IBaseDialogProps } from '@/types/base-dialog.type'
import type { Customer } from '@/types/customer/customer.type.data'
import type { TUpdateCustomerForm } from '@/types/customer/customer.type.req'
import { updateCustomerFormSchema } from '@/types/customer/customer.type.schema'
import { matchCustomerLoyalColor } from '@/utils/matchCustomerStatus'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dot, IdCard, Info, Locate, Mail, PhoneCall, User } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'

interface CustomerEditDialogProps extends IBaseDialogProps<Customer> {
  onEdit: (data: IUpdateCustomer) => void
  isLoading: boolean
}

const CustomerEditDialog = ({
  customer,
  isOpen,
  onClose,
  isLoading,
  onEdit,
}: CustomerEditDialogProps) => {
  const initialFormValues: TUpdateCustomerForm = useMemo(
    () => ({
      address: customer.address,
      customerName: customer.customerName,
      documentNumber: customer.documentNumber,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      status: customer.status.toString(),
    }),
    [customer],
  )

  const form = useForm<TUpdateCustomerForm>({
    resolver: zodResolver(updateCustomerFormSchema),
    defaultValues: initialFormValues,
  })

  const columns: Array<IDescriptionColumns> = useMemo(
    () =>
      [
        {
          title: 'Tên khách hàng',
          render: (
            <FormField
              control={form.control}
              name='customerName'
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder='Vui lòng nhập tên khách hàng'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          ),
          icon: <User />,
        },
        {
          title: 'Email',
          render: (
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input placeholder='Vui lòng nhập email' {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          ),
          icon: <Mail />,
        },
        {
          title: 'SĐT',
          render: (
            <FormField
              control={form.control}
              name='phoneNumber'
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input
                      placeholder='Vui lòng nhập số điện thoại'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          ),
          icon: <PhoneCall />,
        },
        {
          title: 'Số CMND/CCCD',
          render: (
            <FormField
              control={form.control}
              name='documentNumber'
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input
                      placeholder='Vui lòng nhập số CMND/CCCD'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          ),
          icon: <IdCard />,
        },
        {
          title: 'Địa chỉ',
          render: (
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <>
                  <FormControl>
                    <Input placeholder='Vui lòng nhập địa chỉ' {...field} />
                  </FormControl>
                  <FormMessage />
                </>
              )}
            />
          ),
          icon: <Locate />,
        },
        {
          title: 'Trạng thái',
          render: (
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? '1'}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Trạng thái khách hàng' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='1'>Hoạt Động</SelectItem>
                      <SelectItem value='2'>Không hoạt động</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </>
              )}
            />
          ),
          icon: <Info />,
        },
      ] as IDescriptionColumns[],
    [form.control],
  )

  const onSubmit = (values: TUpdateCustomerForm) => {
    const mapToUpdateModel = {
      customerId: customer.customerId,
      data: {
        ...values,
      },
    } as IUpdateCustomer
    onEdit(mapToUpdateModel)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='dialog-right-side'>
        <DialogHeader>
          <DialogTitle>
            <span className='text-base font-semibold'>
              {`Chỉnh sửa`} {` `}
              <Badge className={matchCustomerLoyalColor(customer.isLoyal)}>
                <Dot className='animate-ping' />
                {customer.isLoyal
                  ? 'Khách hàng thân thiết'
                  : 'Khách hàng thường'}
              </Badge>
            </span>
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form className={itemSpacing} onSubmit={form.handleSubmit(onSubmit)}>
            <DescriptionComponent columns={columns} />
          </form>
        </Form>
        <DialogFooter>
          <Button
            type='button'
            disabled={isLoading}
            variant='outline'
            onClick={onClose}>
            Đóng
          </Button>
          <Button
            onClick={() => form.handleSubmit(onSubmit)()}
            disabled={!form.formState.isDirty}
            loading={isLoading}
            variant='default'>
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CustomerEditDialog
