// @ts-nocheck
import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    overwrite: true,
    schema: 'https://api-sa-east-1.hygraph.com/v2/clolm2tjg8pqt01t91dnj77op/master',
    documents: './src/**/*.tsx',
    generates: {
        './src/utils/nextgraph/graphql/': {
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
