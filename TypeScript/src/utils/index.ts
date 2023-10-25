import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  PORT: number;
  DBURI: string | undefined;
}

const config: Config = {
  PORT: parseInt(process.env.PORT as string, 10) || 8000,
  DBURI: process.env.DBURI,
};

export default config;
