import './ExampleModule.scss'

const ExampleModule = async ({
    fields,
    uri,
    order,
}: /* @ts-expect-error Async Server Component */
ModuleProps<any>): React.ReactElement => {
    return <section></section>
}

export { ExampleModule }
