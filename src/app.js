/**
 * Module dependencies
 */

import cors from "cors";
import express from "express";
import morgan from "morgan";
import * as routes from "./routes.js";

const app = express();

/**
 * Setup middlewares
 */

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Configure app to use routes
 */

app.use("/admins", routes.admins);
app.use("/images", routes.images);
app.use("/questions", routes.questions);
app.use("/quiz", routes.quiz);
app.use("/previousYears", routes.previousYears);
app.use("/testSeries",routes.testSeries),
app.use("/series", routes.series);
app.use("/students", routes.students);
app.use("/forums", routes.forums);
app.use("/notifications", routes.notifications);
app.use("/base",routes.base);

export default app;
