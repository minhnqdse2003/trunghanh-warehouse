import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit3, Eye, MoreVerticalIcon, Trash } from 'lucide-react'
import type { ReactNode } from 'react'

interface IDropdownComponent {
  onToggle: () => void
}

interface DropdownItem {
  key: string
  name: string
  icon: ReactNode
  onPerform?: () => void
  variant?: 'default' | 'destructive'
}

const DropdownComponent = (props: IDropdownComponent) => {
  const dropdownItems: Array<DropdownItem> = [
    {
      key: 'edit',
      name: 'Chỉnh sửa',
      icon: <Edit3 />,
      onPerform: props.onToggle,
    },
    {
      key: 'details',
      name: 'Chi tiết',
      icon: <Eye />,
      onPerform: props.onToggle,
    },
    {
      key: 'remove',
      name: 'Xóa',
      icon: <Trash />,
      onPerform: props.onToggle,
      variant: 'destructive',
    },
  ].filter(item => item.onPerform) as Array<DropdownItem>

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
        {dropdownItems.map(item => (
          <DropdownMenuItem
            onClick={() => item.onPerform && item.onPerform()}
            key={item.key}
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
