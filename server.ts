import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { initializeR2 } from "./src/app/config/r2.config";
import { connectRedis } from "./src/app/config/redis.config";
import { config } from "./src/app/config/env.config";
import { registerRoutes } from "./src/app/routes";


const app = express();


// --------------------
// Middleware
// --------------------

app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// --------------------
// Swagger
// --------------------

const currentDir = dirname(fileURLToPath(import.meta.url));

const swaggerDocument = YAML.parse(
    readFileSync(
        resolve(currentDir, "swagger", "image.swagger.yaml"),
        "utf8"
    )
);

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
        explorer: true,
    })
);


// --------------------
// Routes
// --------------------

app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Image engine is running.",
    });
});

registerRoutes(app);


// --------------------
// Error Handler
// --------------------

app.use(
    (
        error: unknown,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction
    ) => {
        const message =
            error instanceof Error
                ? error.message
                : "Unknown server error";

        res.status(500).json({
            success: false,
            message,
        });
    }
);


// --------------------
// Startup
// --------------------

const bootstrap = async () => {
    try {
        console.log("Initializing Cloudflare R2...");
        await initializeR2();
        console.log("Cloudflare R2 ready.");

        console.log("Initializing Redis...");
        await connectRedis();
        console.log("Redis ready.");

        app.listen(config.port, () => {
            console.log(
                `Server running on port ${config.port}`
            );
        });

    } catch (error) {
        console.error("Startup failed:", error);
        process.exit(1);
    }
};


bootstrap();