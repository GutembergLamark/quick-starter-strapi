# Quick Starter

## Instrução de instalação/execução do projeto em ambiente de desenvolvimento

Execute o comando abaixo ao clonar o projeto para criar os containers:
`sudo ./lazystart.sh`

Execute o comando abaixo para rodar os containers do projeto.
`docker-compose up;`

## Criação de templates:

Modulo: `yarn create-template --module <ModuleName>`

Layout: `yarn create-template --layout <LayoutName>`

Componente: `yarn create-template --component --<general | form | field | modal> <ComponentName>`

Interna: `yarn create-template --internal <slug> --post <PostType>`

## Codegen:

Gerar Tipagem de Querys: `yarn codegen`

Tipagem: `<QueryName>Query`

```
Ex:

await fetchQuery<GetAllPagesQuery>(
    /* GraphQL */ `
        query getAllPages {
            pages {
                slug
            }
        }
    `,
    {},
    { cache: 'no-cache' }
)

```
