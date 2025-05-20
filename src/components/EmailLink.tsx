import React from 'react'
import { Link } from 'react-router-dom'

interface EmailLinkProps {
  email: string
  children?: React.ReactNode
  className?: string
  isMobile?: boolean
}

const EmailLink: React.FC<EmailLinkProps> = ({
  email,
  children,
  className,
  isMobile = true,
}) => (
  <Link
    target='_blank'
    to={
      isMobile
        ? `mailto:${email}`
        : `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`
    }
    onClick={event => event.stopPropagation()}
    className={`text-sm text-primary [&>svg]:size-4 flex justify-start items-center gap-1 w-fit border-b border-primary ${className}`}>
    {children || email}
  </Link>
)

export default EmailLink
