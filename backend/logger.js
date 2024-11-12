import winston from "winston";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getLogFileName() {
  const date = new Date();
  const options = { weekday: "long" };
  const dayOfWeek = date.toLocaleDateString("en-US", options);
  const formattedDate = date.toISOString().split("T")[0];
  return `${dayOfWeek}-${formattedDate}.log`;
}

const logDirectory = path.join(__dirname, "tmp", "logs");

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const logger = (filename) => {
  console.log("Logger is called by ", filename);
  return winston.createLogger({
    level: "info",
    format: winston.format.combine(
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.printf(({ level, message, timestamp }) => {
        return `${timestamp} [${level.toUpperCase()}] [${filename}]: ${message}`;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(logDirectory, getLogFileName()),
      }),
    ],
  });
};
//test

export default logger;
