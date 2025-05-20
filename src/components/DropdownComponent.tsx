import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useAuth from '@/hooks/use-auth'
import { Edit3, Eye, MoreVerticalIcon, Trash } from 'lucide-react'
import type { ReactNode } from 'react'

interface IDropdownComponent {
  onToggle: (type: TOnToggleProps) => void
  allowedRoles: {
    edit: Array<number>
    details: Array<number>
    remove: Array<number>
  }
}

export type TOnToggleProps = 'edit' | 'details' | 'remove'

interface DropdownItem {
  key: TOnToggleProps
  name: string
  icon: ReactNode
  onPerform?: (type: TOnToggleProps) => void
  variant?: 'default' | 'destructive'
  visible: boolean
}

const DropdownComponent = (props: IDropdownComponent) => {
  const { role } = useAuth()

  const dropdownItems = [
    {
      key: 'edit',
      name: 'Chỉnh sửa',
      icon: <Edit3 />,
      onPerform: props.onToggle,
      visible: props.allowedRoles.edit.includes(role ?? -1),
    },
    {
      key: 'details',
      name: 'Chi tiết',
      icon: <Eye />,
      onPerform: props.onToggle,
      visible: props.allowedRoles.details.includes(role ?? -1),
    },
    {
      key: 'remove',
      name: 'Xóa',
      icon: <Trash />,
      onPerform: props.onToggle,
      variant: 'destructive',
      visible: props.allowedRoles.remove.includes(role ?? -1),
    },
  ] as Array<DropdownItem>

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex size-8 text-muted-foreground data-[state=open]:bg-muted'
          size='icon'>
          <MoreVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-32'>
        {dropdownItems
          .filter(item => item.onPerform)
          .filter(item => item.visible)
          .map(item => (
            <DropdownMenuItem
              onClick={() => item.onPerform && item.onPerform(item.key)}
              key={item.key}
              className='hover:cursor-pointer'
              variant={item.variant ?? 'default'}>
              {item.icon}
              {item.name}
            </DropdownMenuItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownComponent
