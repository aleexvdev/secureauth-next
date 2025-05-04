import { config } from "@/config/app.config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  config.DATABASE.NAME,
  config.DATABASE.USER,
  config.DATABASE.PASSWORD,
  {
    host: config.DATABASE.HOST,
    port: Number(config.DATABASE.PORT),
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;