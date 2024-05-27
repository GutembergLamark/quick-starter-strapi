import { Metadata } from 'next'
import { fetchQuery, seoConfig } from '..'

/**
 * Essa função gera um objeto metadata utilizando todas as funcões de SEO do Nextpress. É perfeita para automação, basta ser puxada no retorno do generateMetadata() do Next.
 * @param uri A string URI, use a função mergeUri(string[]) para transformar os paramêtros do Next em uma string URI.
 */
export async function generateGraphCmsMetadata(uri: string): Promise<Metadata> {
    const data = await fetchQuery(
        `
          query getPagesSEO($slug: String = "") {
            page(where: {slug: $slug}) {
              ${seoConfig.default.seoQuery}
            }
          }
        `,
        { slug: uri },
        { next: { tags: [uri, 'yoast'] } }
    )

    return wordpressToMetadata(data?.page?.seo)
}

/**
 * Converte um objeto SeoMetadata em Metadata (informações aceitas pelo Next).
 * @param seo O objeto retornado por alguma query de SEO do WpGraphQL.
 * @returns Um objeto formatado aceito pelo Next como Metadata.
 */
export function wordpressToMetadata(seo: SeoMetadata): Metadata {
    return {
        title: seo?.metaTitle,
        keywords: seo?.focusKeywords,
        description: seo?.metaDescription,

        twitter: {
            description: seo?.metaDescription,
            title: seo?.metaTitle,
            images: [
                {
                    url: seo?.ogImage?.url,
                    width: seo?.ogImage?.width,
                    height: seo?.ogImage?.height,
                },
            ],
        },
    }
}
