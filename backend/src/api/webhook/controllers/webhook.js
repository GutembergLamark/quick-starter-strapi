module.exports = {
  index: async ctx => {
    if (ctx.request.body.model === 'header') {
      fetch(`${process.env.NEXTHOST}/essentials/revalidate?tag=header-options`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": process.env.NEXTKEY
        }
      })
    }
    if (ctx.request.body.model === 'page') {
      fetch(`${process.env.NEXTHOST}/essentials/revalidate?tag=page`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": process.env.NEXTKEY
        }
      })
      fetch(`${process.env.NEXTHOST}/essentials/revalidate?tag=${`/${ctx.request.body.entry.slug.replace('home', '')}`}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": process.env.NEXTKEY
        }
      })
    }
    if (ctx.request.body.model === 'post') {
      fetch(`${process.env.NEXTHOST}/essentials/revalidate?tag=post`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": process.env.NEXTKEY
        }
      })
      fetch(`${process.env.NEXTHOST}/essentials/revalidate?tag=${`/${ctx.request.body.entry.slug}`}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": process.env.NEXTKEY
        }
      })
    }
  },
};