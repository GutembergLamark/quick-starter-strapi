import { MotionMain } from '@/utils/libs/framer-motion'
import { ApplicationLdJson } from '@/utils/nextrapi/components/ApplicationLdJson'
import { DynamicModules } from '@/utils/nextrapi/components/DynamicModules'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
    checkNode,
    fetchQuery,
    filterUri,
    generateStrapiMetadata,
    mergeUri,
} from '@/utils/nextrapi'
import { GetAllPagesQuery } from '@/utils/nextrapi/graphql/graphql'

type PagesParams = { params: { pages: string[] } }

export async function generateStaticParams() {
    const res = await fetchQuery<GetAllPagesQuery>(
        /* GraphQL */ `
            query getAllPages {
                pages {
                    data {
                        attributes {
                            title
                            slug
                        }
                    }
                }
            }
        `,
        {},
        { cache: 'no-cache' }
    )

    return (res?.pages?.data ?? [{ attributes: { slug: '/' } }]).map(node => {
        return {
            pages: filterUri(node?.attributes?.slug ?? '/'),
        }
    })
}

export async function generateMetadata({
    params,
}: PagesParams): Promise<Metadata> {
    const uri = mergeUri(params?.pages ?? ['home'])
    return await generateStrapiMetadata(uri)
}

export default async function Page({ params }: PagesParams) {
    const uri = mergeUri(params?.pages ?? ['home'])

    const found = await checkNode(uri, 'Pages')
    if (!found) notFound()

    return (
        <MotionMain key={uri} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <DynamicModules field="main" uri={uri} />
            <ApplicationLdJson uri={uri} type={'Pages'} />
        </MotionMain>
    )
}
