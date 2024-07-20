import { HTMLAttributes, ReactNode } from 'react'

export interface ButtonProps {
    type: 'link' | 'button'
    styleType: 'default'
    children: ReactNode
    href?: string
    target?: string
    buttonProps?: HTMLAttributes<HTMLButtonElement>
    label?: string
}
