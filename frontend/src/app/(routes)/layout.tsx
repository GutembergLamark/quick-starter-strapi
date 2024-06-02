import { Footer, Header } from '@/sections/layouts'
import React from 'react'

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}
