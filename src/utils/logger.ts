import winston from "winston";

const { timestamp, simple, combine } = winston.format;

export const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
  format: combine(timestamp(), simple())
});
