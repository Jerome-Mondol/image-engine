import express from "express";
import { readFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import YAML from "yaml";
import { config } from "./src/app/config/env.config";
import { registerRoutes } from "./src/app/routes";

const app = express();
const currentDir = dirname(fileURLToPath(import.meta.url));
const swaggerFilePath = resolve(currentDir, "swagger", "image.swagger.yaml");
const swaggerDocument = YAML.parse(readFileSync(swaggerFilePath, "utf8"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
    return res.status(200).json({
        success: true,
        message: "Image engine is running.",
    });
});

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

app.get("/swagger.yaml", (_req, res) => {
    return res.type("yaml").send(readFileSync(swaggerFilePath, "utf8"));
});

registerRoutes(app);

app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    const message = error instanceof Error ? error.message : "Unknown server error";

    return res.status(500).json({
        success: false,
        message,
    });
});

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});