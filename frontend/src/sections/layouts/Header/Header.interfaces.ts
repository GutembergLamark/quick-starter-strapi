export interface HeaderMenu {
    menu?: (HeaderLink | null)[] | null | undefined
}

export interface HeaderLink {
    __typename?: 'ComponentMenuLink' | undefined
    title?: string | null | undefined
    url?: string | null | undefined
}
