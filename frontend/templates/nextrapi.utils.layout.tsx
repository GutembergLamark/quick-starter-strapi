// @ts-nocheck
import './__LAYOUTNAME__.scss'

async function getData() {
    return {}
}

/* @ts-expect-error Async Server Component */
const __LAYOUTNAME__ = async (): React.ReactElement => {
    const data = await getData()
    return <></>
}

export { __LAYOUTNAME__ }
