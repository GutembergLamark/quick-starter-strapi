declare interface SeoMetadata {
    metaTitle: string
    metaDescription: string
    metaImage: {
        data: {
            attributes: {
                url: string
                width: number
                height: number
            }
        }
    }
    metaSocial: [
        {
            title: string
            description: string
            socialNetwork: string
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
    ]
    keywords: string
    metaRobots: string
    structuredData: string
    metaViewport: string
    canonicalURL: string
}
