import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config(); // Loads environment variables from .env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [import.meta.dirname + "/../**/*.entity.{js,ts}"],
  migrations: [import.meta.dirname + "/../database/migrations/*.{js,ts}"],
});

try {
  await AppDataSource.initialize();
  console.log("Data Source has been initialized!");
} catch (error) {
  console.error("Error during Data Source initialization", error);
}
