import { Express, Router } from "express";

type RouteDefinition = {
    path: string;
    router: Router;
};

export const registerVersionedRoutes = (
    app: Express,
    routes: RouteDefinition[],
    versionPrefix = "/api/v1"
) => {
    const versionRouter = Router();

    for (const { path, router } of routes) {
        versionRouter.use(path, router);
    }

    app.use(versionPrefix, versionRouter);
};