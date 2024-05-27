import * as Modules from '@/sections/modules'

const defaultFields = `
id
__typename
`

let fieldsTypes: { [key in keyof typeof Modules]: string } = {} as {
    [key in keyof typeof Modules]: string
}
for (let moduleName in Modules) {
    ;(fieldsTypes as any)[moduleName] = moduleName
}

export const fields = [
    {
        field: fieldsTypes?.ExampleSection,
        query: `
        ${defaultFields}
          title
          `,
    },
    {
        field: fieldsTypes?.SecondSection,
        query: `
      ${defaultFields}
    `,
    },
]
