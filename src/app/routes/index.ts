import { Express } from "express";
import imageRoutes from "./images.routes";
import storageRoutes from "./storage.routes";
import { registerVersionedRoutes } from "./register";

export const registerRoutes = (app: Express) => {
    registerVersionedRoutes(app, [
        { path: "/images", router: imageRoutes },
        { path: "/storage", router: storageRoutes },
    ]);
};