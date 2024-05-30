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
            ${cur.toLowerCase()}(where: {slug: $slug}, stage: PUBLISHED) {
              __typename
              id
              stage
            }
        `
        return prev + checkQuery
    }, '')

    const node = await fetchQuery<any>(
        `
        query getNotFound($slug: String = "") {
            ${typesQuery}
        }
        `,
        { slug: uri_ },
        { next: { tags: [uri_] } }
    )
    return (
        !!node?.[type.toLowerCase()] &&
        (type ? node?.[type.toLowerCase()]?.__typename == type : true) &&
        node?.[type.toLowerCase()]?.stage == 'PUBLISHED'
    )
}
