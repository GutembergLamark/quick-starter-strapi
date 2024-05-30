import './Header.scss'

async function getData() {
    return {}
}

/* @ts-expect-error Async Server Component */
const Header = async (): React.ReactElement => {
    const data = await getData()
    return <>HEADER</>
}

export { Header }
