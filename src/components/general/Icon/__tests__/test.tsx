import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { Icon } from '@/components/general'

describe('Icon', () => {
    it('Renderiza uma imagem', () => {
        render(<Icon type="facebook" />)

        const image = screen.getByRole('img')

        expect(image).toBeInTheDocument()
    })
})
