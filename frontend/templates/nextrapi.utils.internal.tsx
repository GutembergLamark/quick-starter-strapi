// @ts-nocheck

import {
    checkWordpressNode,
    generateNextpressMetadata,
    mergeUri,
} from '@/utils/nextpress'
import { ApplicationLdJson } from '@/utils/nextpress/components'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { MotionMain } from '@/utils/motion'
import { setStaticParamsLocale } from 'next-international/server'
import { draftMode } from 'next/headers'

export async function generateMetadata({
    params,
}: {
    params: { slug: string; locale: string }
}): Promise<Metadata> {
    const uri = `/__MODULENAME__${mergeUri([params?.slug] ?? [])}`
    return await generateNextpressMetadata(uri, params?.locale)
}

export default async function Page({
    params,
}: {
    params: { slug: string; locale: string }
}) {
    setStaticParamsLocale(params?.locale)
    const uri = `/__MODULENAME__${mergeUri([params?.slug] ?? [])}`
    const found = await checkWordpressNode(uri, '__POSTTYPE__')
    const { isEnabled } = draftMode()
    if (!found) notFound()

    return (
        <MotionMain key={uri} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ApplicationLdJson uri={uri} />
        </MotionMain>
    )
}
