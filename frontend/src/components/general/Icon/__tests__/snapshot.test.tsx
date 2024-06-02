import { render } from '@testing-library/react'
import { Icon } from '@/components/general'

it('Torna a página inicial inalterada', () => {
    const { container } = render(<Icon type="facebook" />)
    expect(container).toMatchSnapshot()
})
