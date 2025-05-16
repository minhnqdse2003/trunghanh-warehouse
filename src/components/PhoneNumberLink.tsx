import { PhoneCall } from 'lucide-react'
import { Link } from 'react-router-dom'
interface PhoneNumberLinkProps {
  phoneNumber: string
  children?: React.ReactNode
  className?: string
}

const PhoneNumberLink: React.FC<PhoneNumberLinkProps> = ({
  phoneNumber,
  children,
  className = '',
}) => (
  <Link
    className={`text-sm text-primary [&>svg]:size-4 flex justify-start items-center gap-1 w-fit border-b border-primary ${className}`}
    to={`tel:${phoneNumber}`}>
    <PhoneCall />
    {children || phoneNumber}
  </Link>
)

export default PhoneNumberLink
