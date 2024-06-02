import { fetchQuery } from '@/utils/nextrapi'
import './Header.scss'
import { GetHeaderOptionsQuery } from '@/utils/nextrapi/graphql/graphql'

async function getData() {
    return await fetchQuery<GetHeaderOptionsQuery>(
        /* GraphQL */ `
            query getHeaderOptions {
                header {
                    data {
                        attributes {
                            logo {
                                data {
                                    attributes {
                                        url
                                        width
                                        height
                                    }
                                }
                            }
                            menu {
                                ... on ComponentMenuLink {
                                    title
                                    url
                                }
                            }
                        }
                    }
                }
            }
        `,
        {},
        { next: { tags: ['header-options'] } }
    )
}

/* @ts-expect-error Async Server Component */
const Header = async (): React.ReactElement => {
    const data = await getData()
    return <>HEADER</>
}

export { Header }
