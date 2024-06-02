import * as Modules from '@/sections/modules'
import { fetchQuery } from '../../utilities/graphql-fetch'
import { fields } from '../../configs/fields.config'
/**
 * Esse componente busca atráves de um "field" especificado todos os módulos flexíveis existentes em um Post / Page do GraphCms. E renderiza (se encontrar) os módulos subsequentes exportados em @/sections/modules
 * @param field O nome do campo ACF onde o conteúdo flexível está localizado.
 * @param uri O URI da página do conteúdo flexível.
 * @param staticCount Quantos módulos estáticos existem antes desse na página (opcional)
 * @returns
 */
const DynamicModules = async ({
    field,
    uri,
    staticCount = 0,
}: {
    field: string
    uri: string
    staticCount?: number
    /* @ts-expect-error Async Server Component */
}): React.ReactElement => {
    const uri_ = uri.replace('/', '')

    const modulesType = fields.reduce((prev, cur) => {
        let checkQuery = `
        ...on ${cur?.field} {
            ${cur?.query}
          }
        `
        return prev + checkQuery
    }, '')

    const dynamic: {
        pages: {
            data: [
                {
                    attributes: {
                        modules: Array<any> | null
                        __typename: string | false
                    }
                }
            ]
        }
    } = await fetchQuery<any>(
        /* GraphQL */ `
        query getModules($slug: String = "") {
            pages(filters: {slug: {eq: $slug}}) {
                data {
                    attributes{
                        modules {
                        ${modulesType}
                        }
                        __typename
                    }
                }
            }
        }
        `,
        { slug: uri_ }
    )

    return dynamic?.pages?.data[0]?.attributes?.modules ? (
        <>
            {dynamic?.pages?.data[0]?.attributes?.modules.map((module, i) => {
                const name = module?.__typename.replace('ComponentModules', '')
                const Module =
                    Modules?.[(name ?? '') as keyof typeof Modules] ?? false

                return Module ? (
                    <Module
                        fields={module || {}}
                        uri={uri ?? ''}
                        order={staticCount + (i + 1)}
                        key={`dynamic-module-${i}`}
                    />
                ) : (
                    <></>
                )
            })}
        </>
    ) : (
        <></>
    )
}

export { DynamicModules }
