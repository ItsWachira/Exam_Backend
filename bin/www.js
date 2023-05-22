#!/usr/bin/env node

/**
 * Module dependencies.
 */

import http from "http";
import mongoose from "mongoose";
import app from "../src/app.js";
import Debug from "../src/utilities/debug.js";

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;

  // port number
  if (port >= 0) return port;

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") throw error;

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const address = server.address();
  const bind =
    typeof address === "string" ? "pipe " + address : "port " + address.port;
  Debug.server(`Listening on ${bind}`);
}

/**
 * Connect to mongodb database through mongoose.
 */

try {
  const db = mongoose.connection;

  db.on("error", (error) => console.log(error));

  db.on("connected", () => Debug.database(`[MongoDB] Connected to ${db.name}`));

  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
} catch (error) {
  console.log(error);
}
