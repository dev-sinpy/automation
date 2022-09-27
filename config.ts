import * as dotenv from "dotenv";

dotenv.config();
const env: NodeJS.ProcessEnv = process.env;

const config = {
  baseUrl: env.BASE_URL,
};

export default config;
