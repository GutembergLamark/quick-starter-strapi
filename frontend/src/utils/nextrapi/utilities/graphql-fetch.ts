import { RequestInit } from 'next/dist/server/web/spec-extension/request'

/**
 * Realiza um fetch com GraphQL na rota principal da aplicação.
 * @param query A query do GraphQL.
 * @param variables As variáveis da query.
 * @param nextFetchConfig As configurações extras do Next.
 * @returns Sua query feita, ou um erro.
 */
export async function fetchQuery<T>(
    query: string,
    variables: { [key: string]: string | number } = {},
    nextFetchConfig: RequestInit = {}
): Promise<T> {
    return fetch(`${process.env.STRAPI}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STRAPI_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
            query: query,
            variables: {
                ...variables,
            },
        }),
        ...nextFetchConfig,
    }).then(res =>
        res.json().then(res => {
            if (res?.errors?.length > 0)
                console.error('fetchQuery error: ' + res?.errors?.[0]?.message)
            return res.data
        })
    )
}
