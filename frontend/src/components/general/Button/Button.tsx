import { MotionButton, MotionLink } from '@/utils/libs/framer-motion'
import style from './Button.module.scss'
import { ButtonProps } from './Button.interfaces'

export function Button({
    type,
    styleType,
    children,
    href,
    target,
    buttonProps,
    label,
}: ButtonProps) {
    const Tag = type === 'button' ? MotionButton : MotionLink
    return (
        <Tag
            aria-label={label}
            className={`${style.button} ${style[`button--${styleType}`]}`}
            href={(type == 'link' ? href : undefined) as string}
            target={(type == 'link' ? target : undefined) as string}
            {...((type == 'button' ? buttonProps : {}) as any)}
        >
            {children}
        </Tag>
    )
}
