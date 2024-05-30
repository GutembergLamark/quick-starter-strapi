import { MotionMain } from '@/utils/libs/framer-motion'
import { ApplicationLdJson } from '@/utils/nextgraph/components/ApplicationLdJson'
import { DynamicModules } from '@/utils/nextgraph/components/DynamicModules'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
    checkNode,
    fetchQuery,
    filterUri,
    generateGraphCmsMetadata,
    mergeUri,
} from '@/utils/nextgraph'

type PagesParams = { params: { pages: string[] } }

export async function generateStaticParams() {
    const res = await fetchQuery(
        `
            query getAllPages {
                pages {
                    slug
                }
            }
        `,
        {},
        { cache: 'no-cache' }
    )
    return (res?.pages ?? [{ slug: '/' }]).map((node: { slug: string }) => {
        return {
            pages: filterUri(node?.slug ?? '/'),
        }
    })
}

export async function generateMetadata({
    params,
}: PagesParams): Promise<Metadata> {
    const uri = mergeUri(params?.pages ?? ['home'])
    return await generateGraphCmsMetadata(uri)
}

export default async function Page({ params }: PagesParams) {
    const uri = mergeUri(params?.pages ?? ['home'])

    const found = await checkNode(uri, 'Page')
    if (!found) notFound()

    return (
        <MotionMain key={uri} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DynamicModules field="main" uri={uri} />
            <ApplicationLdJson uri={uri} type={'Page'} />
        </MotionMain>
    )
}
