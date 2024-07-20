import { fetchQuery } from '@/utils/nextrapi'
import './Header.scss'
import { GetHeaderOptionsQuery } from '@/utils/nextrapi/graphql/graphql'
import Link from 'next/link'
import Image from 'next/image'
import { StrapImage } from '@/utils/nextrapi/components/StrapiImage'
import HeaderNav from './Header.nav'
import { HeaderLink, HeaderMenu } from './Header.interfaces'

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
    const layout = data?.header?.data?.attributes
    return (
        <header className="header">
            <div className="header__wrapper wrapper">
                <h1>
                    <Link href={'/'} aria-label="Home">
                        <StrapImage
                            src={layout?.logo?.data[0]?.attributes?.url ?? ''}
                            width={
                                layout?.logo?.data[0]?.attributes?.width ?? 0
                            }
                            height={
                                layout?.logo?.data[0]?.attributes?.height ?? 0
                            }
                            alt="Logo"
                            priority
                        />
                    </Link>
                </h1>
                <HeaderNav menu={layout?.menu as Array<HeaderLink>} />
            </div>
        </header>
    )
}

export { Header }
