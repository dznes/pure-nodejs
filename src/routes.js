import { userRoutes } from "./user/routes.js"

function register(...routes) {
    const allRoutes = routes.flat()
    return allRoutes
}

export const routes = register(userRoutes)
