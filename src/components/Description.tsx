import React, { type ReactNode } from 'react'
import { Label } from './ui/label'
import { Separator } from './ui/separator'

interface IDescription {
  columns: Array<IDescriptionColumns>
}

export interface IDescriptionColumns {
  title: string | ReactNode
  icon?: ReactNode
  render: string | ReactNode
}

export const itemSpacing = `mt-4 space-y-4 basis-auto grow shrink-0`

const DescriptionComponent = ({ columns }: IDescription) => {
  return (
    <>
      {columns.map((column, idx) => (
        <React.Fragment key={idx + 'description'}>
          <div className='flex items-center'>
            <Label className='text-gray-600 basis-1/4'>
              {column.icon}
              <span>{column.title}:</span>
            </Label>
            <span className='font-medium text-sm grow'>{column.render}</span>
          </div>
          {idx !== columns.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </>
  )
}

export default DescriptionComponent
