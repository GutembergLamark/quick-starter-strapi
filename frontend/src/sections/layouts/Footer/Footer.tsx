import './Footer.scss'

/* async function getData() {
    return await fetchQuery<Type>(
         GraphQL `
            
                
        `,
        {},
        { next: { tags: [''] } }
    )
} */

/* @ts-expect-error Async Server Component */
const Footer = async (): React.ReactElement => {
    // const data = await getData()
    return <>FOOTER</>
}

export { Footer }
