import './SecondSection.scss'

// Se o módulo for ter alguma informação estática pegar aqui.
// async function getData(uri: string, locale: string) {
//     return {}
// }

const SecondSection = async ({
    fields,
    uri,
    order,
}: /* @ts-expect-error Async Server Component */
ModuleProps): React.ReactElement => {
    // const data = await getData(uri, locale)
    return <section>{fields?.__typename}</section>
}

export { SecondSection }
