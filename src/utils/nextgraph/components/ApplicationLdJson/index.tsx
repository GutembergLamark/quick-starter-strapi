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
    const typesQuery = models.reduce((prev, cur) => {
        let checkQuery = `
        ${cur.toLowerCase()}(where: {slug: $slug}, stage: PUBLISHED) {
          __typename
          id
          title
        }
        `
        return prev + checkQuery
    }, '')
    const res = await fetchQuery(
        `
        query getRawSchema($slug: String = "") {
            ${typesQuery}
        }
        `,
        { slug: uri },
        { next: { tags: [uri] } }
    )
    const data = res?.[type.toLowerCase()]

    if (!data) return <></>
    return (
        <>
            {data ? (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: `
                        {
                        "@context": "http://schema.org",
                        "@type": "WebSite",
                        "name": "${data?.title}",
                        "url": "${process.env.HOST}/${uri}"
                        }
                        `,
                    }}
                />
            ) : (
                <></>
            )}
        </>
    )
}
