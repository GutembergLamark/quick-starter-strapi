export interface SlideType {
    title: string
    subtitle: string
    description: string
    button_title: string
    button_url: string
    image: {
        data: {
            attributes: {
                url: string
                width: number
                height: number
            }
        }
    }
}

export interface Fields {
    id: string
    __typename: string
    title: string
    slides: [SlideType]
}
