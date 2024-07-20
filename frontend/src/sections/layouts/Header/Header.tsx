import './Header.scss'

/* async function getData() {
    return await fetchQuery<Type>(
         GraphQL `
            
                
        `,
        {},
        { next: { tags: [''] } }
    )
} */

/* @ts-expect-error Async Server Component */
const Header = async (): React.ReactElement => {
    // const data = await getData()
    return <header className="header">HEADER</header>
}

export { Header }
