import React from 'react'
import { Link } from 'react-router-dom'

interface EmailLinkProps {
  email: string
  children?: React.ReactNode
  className?: string
}

const EmailLink: React.FC<EmailLinkProps> = ({
  email,
  children,
  className,
}) => (
  <Link
    target='_blank'
    to={`mailto:${email}`}
    className={`text-sm text-primary [&>svg]:size-4 flex justify-start items-center gap-1 w-fit border-b border-primary ${className}`}>
    {children || email}
  </Link>
)

export default EmailLink
