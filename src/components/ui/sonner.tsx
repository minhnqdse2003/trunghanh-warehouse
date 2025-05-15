import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()
  const defaultClassNames = {
    toast:
      'group text-sm rounded-lg p-5 min-w-64 border font-sans font-semibold toast group-[.toaster]:shadow-lg flex items-center gap-3',
    actionButton:
      'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
    cancelButton:
      'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
    success:
      'group-[.toaster]:bg-emerald-100 group-[.toaster]:text-emerald-700 group-[.toaster]:border-emerald-500 dark:group-[.toaster]:bg-emerald-500 dark:group-[.toaster]:border-emerald-500 group-[.toaster]:[&>[data-content]>[data-title]]:text-sm group-[.toaster]:[&>[data-content]>[data-description]]:text-xs group-[.toaster]:[&>[data-content]>[data-description]]:font-normal',
    error:
      'group-[.toaster]:bg-red-100 group-[.toaster]:text-pale-green-1000 group-[.toaster]:text-red-700 group-[.toaster]:[&>[data-content]>[data-title]]:text-sm group-[.toaster]:[&>[data-content]>[data-description]]:text-xs group-[.toaster]:[&>[data-content]>[data-description]]:font-normal',
    warning:
      'group-[.toaster]:bg-orange-100 group-[.toaster]:text-orange-700 group-[.toaster]:border-orange-200 dark:group-[.toaster]:bg-orange-900 dark:group-[.toaster]:text-orange-100 dark:group-[.toaster]:border-orange-800 group-[.toaster]:[&>[data-content]>[data-title]]:text-sm group-[.toaster]:[&>[data-content]>[data-description]]:text-xs group-[.toaster]:[&>[data-content]>[data-description]]:font-normal',
    info: 'group-[.toaster]:bg-blue-100 group-[.toaster]:text-blue-700 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-blue-900 dark:group-[.toaster]:text-blue-100 dark:group-[.toaster]:border-blue-800 group-[.toaster]:[&>[data-content]>[data-title]]:text-sm group-[.toaster]:[&>[data-content]>[data-description]]:text-xs group-[.toaster]:[&>[data-content]>[data-description]]:font-normal',
  }
  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        unstyled: true,
        classNames: {
          ...defaultClassNames,
        },
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
