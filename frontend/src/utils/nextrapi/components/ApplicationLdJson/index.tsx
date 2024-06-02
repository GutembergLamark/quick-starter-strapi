import { ModelsKeys, models } from '../../configs/models.config'
import { fetchQuery } from '../../utilities/graphql-fetch'
import 'server-only'

export async function ApplicationLdJson({
    uri,
    type,
}: {
    uri: string
    type: ModelsKeys
    /* @ts-expect-error Async Server Component */
}): React.ReactElement {
    const uri_ = uri.replace('/', '')

    const typesQuery = models.reduce((prev, cur) => {
        let checkQuery = `
        ${cur.toLowerCase()}(filters: {slug: {eq: $slug}}){
            data{
              attributes{
               seo{
                structuredData
                }
              }
            }
          }
        `
        return prev + checkQuery
    }, '')
    const res = await fetchQuery<any>(
        `
        query getRawSchema($slug: String = "") {
            ${typesQuery}
        }
        `,
        { slug: uri_ },
        { next: { tags: [uri_] } }
    )

    console.log(res)

    const data = res?.[type.toLowerCase()]?.data

    if (!data.length) return <></>
    return (
        <>
            {data ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(
                            data[0]?.attributes?.seo?.structuredData
                        ),
                    }}
                />
            ) : (
                <></>
            )}
        </>
    )
}
