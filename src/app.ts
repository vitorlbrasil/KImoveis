import "reflect-metadata";
import "express-async-errors";
import express from "express";

import usersRouter from "./routes/users.routes";
import sessionsRouter from "./routes/sessions.routes";
import handleErrorMiddleware from "./middlewares/handleError.middleware";
import categoriesRouter from "./routes/categories.routes";
import propertiesRouter from "./routes/properties.routes";
import schedulesRouter from "./routes/schedules.routes";

const app = express();
app.use(express.json());
app.use("/users", usersRouter);
app.use("/login", sessionsRouter);
app.use("/categories", categoriesRouter);
app.use("/properties", propertiesRouter);
app.use("/schedules", schedulesRouter);

app.use(handleErrorMiddleware);

export default app;
