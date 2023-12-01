import http from 'node:http'

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

// Métodos HTTP
//GET
//POST
//PUT: Atualiza varias propriedades da entidade.
//PATCH: Atualiza uma propriedade específica da entidade.
//DELETE

// HEADERS (Metadata)
//   'Content-type', 'application/json'


const server = http.createServer(async (request, response) => {
    const { method, url } = request

    await json(request,response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route) {
        const routeParams = request.url.match(route.path)

        const { query, ...params } = routeParams.groups

        request.params = params
        request.query = query ? extractQueryParams(query) : {}

        return route.handler(request,response)
    }

    console.log(route)
    
    return response.writeHead(404).end('Not found')
})

server.listen(3333)
