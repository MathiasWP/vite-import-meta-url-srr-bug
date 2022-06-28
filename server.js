const express = require('express')
const { createServer: createViteServer } = require('vite')

async function createServer() {
    const app = express()
    const vite = await createViteServer({
        server: { middlewareMode: 'ssr' }
    })

    // app.use(vite.middlewares)

    app.use('*', async (req, res, next) => {
        try {
            // Simply importing the client-side code
            // is enough to trigger the "`new URL(url, import.meta.url)` is not supported in SSR" error
            await vite.ssrLoadModule('/src/client.js')

            res.status(200).set({ 'Content-Type': 'text/html' }).end('Nothing crashed! :)')
        } catch (e) {
            vite.ssrFixStacktrace(e)
            next(e)
        }
    })

    app.listen(3000)
}


createServer()