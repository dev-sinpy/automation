import * as dotenv from 'dotenv';

dotenv.config();
const env: NodeJS.ProcessEnv = process.env;

const config = {
  baseUrl: env.BASE_URL || "http://dublin-ts.dev.fider.io:3000",
};

export default config;
