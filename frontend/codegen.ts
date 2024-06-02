// @ts-nocheck
import { CodegenConfig } from '@graphql-codegen/cli'
import 'dotenv'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:1337/graphql',
    documents: './src/**/*.tsx',
    generates: {
        './src/utils/nextrapi/graphql/': {
            preset: 'client',
            plugins: [
                'typescript',
                'typescript-operations',
                {
                    add: {
                        content: ['/* eslint-disable */', '// @ts-nocheck'],
                    },
                },
            ],
        },
    },
}

export default config
