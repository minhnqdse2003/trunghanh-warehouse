export interface IBaseDialogProps<TData> {
  customer: TData
  isOpen: boolean
  onClose: () => void
}
