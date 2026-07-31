import { Express } from "express";
import imageRoutes from "./images.routes";
import { registerVersionedRoutes } from "./register";

export const registerRoutes = (app: Express) => {
    registerVersionedRoutes(app, [
        { path: "/images", router: imageRoutes },
    ]);
};