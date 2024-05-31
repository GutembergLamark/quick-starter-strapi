import { revalidateTag } from 'next/cache'
import { headers } from 'next/dist/client/components/headers'
import { NextRequest, NextResponse } from 'next/server'
import chalk from 'chalk'

export async function GET(req: NextRequest) {
    const headersList = headers()
    const searchParams = req.nextUrl.searchParams
    const authorization = headersList.get('Authorization')
    if (authorization != process.env?.NEXTKEY)
        return NextResponse.json({ revalidate: false }, { status: 401 })

    const tag = searchParams.get('tag')

    if (tag) revalidateTag(tag)
    else return NextResponse.json({ revalidate: false }, { status: 418 })

    console.log(
        chalk.green(
            `- Revalidated tag: ${chalk.cyan(`"${tag}"`)} on ${new Date(
                Date.now()
            ).toString()}.`
        )
    )

    return NextResponse.json({ revalidated: true, now: Date.now() })
}
