import '@/assets/sass/pages/notFound.scss'
import { MotionMain } from '@/utils/libs/framer-motion'

export default function NotFound() {
    return (
        <MotionMain
            key="not-found"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="notFound"
        >
            <h2>404</h2>
            <h3>Oops! Página não encontrada</h3>
            <p>
                Essa página não existe ou foi removida. Sugerimos que volte para
                Home
            </p>
        </MotionMain>
    )
}
