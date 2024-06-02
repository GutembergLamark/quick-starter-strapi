import { ModelsKeys, models } from '../configs/models.config'
import { fetchQuery } from './graphql-fetch'

import { draftMode } from 'next/headers'

/**
 * Verifica se o URI atual coincide com algum Node do Wordpress (página, post ou post-type customizado).
 * @param uri A URI para verificar
 * @param type Limitar a verificação por post-type.
 * @returns Valor booleano.
 */
export async function checkNode(uri: string, type: ModelsKeys) {
    const uri_ = uri.replace('/', '')

    const { isEnabled } = draftMode()
    if (isEnabled) return true

    const typesQuery = models.reduce((prev, cur) => {
        let checkQuery = `
            ${cur.toLowerCase()}(filters: {slug: {eq: $slug}}) {
                data{
                    attributes{
                        __typename
                    }
                }
            }
        `
        return prev + checkQuery
    }, '')

    const node = await fetchQuery<any>(
        /* GraphQL */ `
        query getNotFound($slug: String = "") {
            ${typesQuery}   
        }
        `,
        { slug: uri_ },
        { next: { tags: [uri_] } }
    )

    return (
        !!node?.[type.toLowerCase()]?.data.length &&
        (type
            ? `${
                  node?.[type.toLowerCase()]?.data[0]?.attributes?.__typename
              }s` == type
            : true)
    )
}
