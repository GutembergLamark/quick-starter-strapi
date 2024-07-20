import { Fields } from './Banner.interfaces'
import './Banner.scss'
import Slide from './Banner.slide'

const Banner = async ({
    fields,
    uri,
    order,
}: /* @ts-expect-error Async Server Component */
ModuleProps<Fields>): React.ReactElement => {
    return (
        <section className="banner">
            <div className="banner__wrapper wrapper">
                <Slide slides={fields?.slides} />
            </div>
        </section>
    )
}

export { Banner }
