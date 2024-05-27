declare interface SeoMetadata {
    metaTitle: string
    metaDescription: string
    focusKeywords: string
    ogImage: {
        url: string
        width: number
        height: number
    }
    page: {
        slug: string
    }
}
