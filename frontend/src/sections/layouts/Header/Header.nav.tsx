'use client'

import { MotionButton, MotionSpan } from '@/utils/libs/framer-motion'
import { HeaderMenu } from './Header.interfaces'
import { Fragment, useState } from 'react'
import Link from 'next/link'

export default function HeaderNav({ menu }: HeaderMenu) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <MotionButton
                animate={open ? 'open' : 'closed'}
                className="header__button"
                onClick={() => setOpen(!open)}
                aria-label="Abrir menu"
            >
                <MotionSpan
                    variants={{
                        closed: { rotateZ: 0, y: 0 },
                        open: { borderRadius: 0, y: 6.35, rotateZ: 45 },
                    }}
                />
                <MotionSpan
                    variants={{
                        closed: { opacity: 1, scaleX: 1 },
                        open: { opacity: 0, scaleX: 0 },
                    }}
                />
                <MotionSpan
                    variants={{
                        closed: { rotateZ: 0, y: 0 },
                        open: { borderRadius: 0, y: -6.35, rotateZ: -45 },
                    }}
                />
            </MotionButton>

            <nav className="header__nav" data-active={open ? '' : null}>
                {menu?.map(link => {
                    return (
                        <Fragment
                            key={`${link?.title}-${link?.url}-${link?.__typename}`}
                        >
                            {link?.title ? (
                                <Link href={link?.url ?? '/'} target="_self">
                                    {link?.title}
                                </Link>
                            ) : null}
                        </Fragment>
                    )
                })}
            </nav>
        </>
    )
}
