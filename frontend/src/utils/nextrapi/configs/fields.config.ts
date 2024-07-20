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

const getField = (module: string) => `ComponentModules${module}`

export const fields = [
    {
        field: getField(fieldsTypes?.ExampleModule),
        query: `
        ${defaultFields}
          
          `,
    },
]
