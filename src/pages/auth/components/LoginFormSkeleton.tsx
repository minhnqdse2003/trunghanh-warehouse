import { Skeleton } from '@/components/ui/skeleton'

const LoginFormSkeleton = () => {
  return (
    <div className='space-y-8'>
      <div className='space-y-2'>
        <Skeleton className='h-4 w-[150px]' />
        <Skeleton className='h-10 w-full' />
      </div>

      <div className='space-y-2'>
        <Skeleton className='h-4 w-[120px]' />
        <Skeleton className='h-10 w-full' />
      </div>

      <Skeleton className='h-10 w-[100px]' />
    </div>
  )
}

export default LoginFormSkeleton
