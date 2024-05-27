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
    const modulesType = fields.reduce((prev, cur) => {
        let checkQuery = `
        ... on ${cur?.field} {
            ${cur?.query}
          }
        `
        return prev + checkQuery
    }, '')

    const dynamic: {
        page: {
            modules: Array<any> | null
            _id: string | 0
            post_type: string | false
        }
    } = await fetchQuery(
        `
        query getModules($slug: String = "") {
            page(where: {slug: $slug}) {
                modules {
                ${modulesType}
                }
            }
        }
        `,
        { slug: uri }
    )

    return dynamic?.page?.modules ? (
        <>
            {dynamic?.page?.modules.map((module, i) => {
                const Module =
                    Modules?.[
                        (module?.__typename ?? '') as keyof typeof Modules
                    ] ?? false

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
