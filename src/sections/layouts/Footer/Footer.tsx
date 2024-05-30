import './Footer.scss'

async function getData() {
    return {}
}

/* @ts-expect-error Async Server Component */
const Footer = async (): React.ReactElement => {
    const data = await getData()
    return <>FOOTER</>
}

export { Footer }
