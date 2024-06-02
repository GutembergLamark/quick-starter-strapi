import { Metadata } from 'next'
import { fetchQuery, seoConfig } from '..'

/**
 * Essa função gera um objeto metadata utilizando todas as funcões de SEO do Nextpress. É perfeita para automação, basta ser puxada no retorno do generateMetadata() do Next.
 * @param uri A string URI, use a função mergeUri(string[]) para transformar os paramêtros do Next em uma string URI.
 */
export async function generateStrapiMetadata(uri: string): Promise<Metadata> {
    const uri_ = uri.replace('/', '')

    const data = await fetchQuery<any>(
        /* GraphQL */ `
          query getPagesSEO($slug: String = "") {
            pages(filters: {slug: {eq: $slug}}) {
                data{
                    attributes{
                        ${seoConfig.default.seoQuery}
                    }
                }
            }
          }
        `,
        { slug: uri_ },
        { next: { tags: [uri_, 'yoast'] } }
    )

    return strapiToMetadata(data?.pages?.data[0]?.attributes?.seo)
}

/**
 * Converte um objeto SeoMetadata em Metadata (informações aceitas pelo Next).
 * @param seo O objeto retornado por alguma query de SEO do WpGraphQL.
 * @returns Um objeto formatado aceito pelo Next como Metadata.
 */
export function strapiToMetadata(seo: SeoMetadata): Metadata {
    const socials = seo?.metaSocial?.map(social => {
        return {
            [social?.title]: {
                title: social?.title,
                description: social?.description,
                images: [
                    {
                        url: social?.image?.data?.attributes?.url,
                        width: social?.image?.data?.attributes?.width,
                        height: social?.image?.data?.attributes?.height,
                    },
                ],
            },
        }
    })

    return {
        title: seo?.metaTitle,
        keywords: seo?.keywords,
        description: seo?.metaDescription,
        openGraph: {
            type: 'article' as 'article',
            title: seo?.metaTitle,
            description: seo?.metaDescription,
            images: [
                {
                    url: seo?.metaImage?.data?.attributes?.url,
                    width: seo?.metaImage?.data?.attributes?.width,
                    height: seo?.metaImage?.data?.attributes?.height,
                },
            ],
        },
        ...socials,
        alternates: {
            canonical: seo?.canonicalURL,
        },
    }
}
