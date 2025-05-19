import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  mongo: {
    username: process.env.MONGO_USER || 'root',
    password: process.env.MONGO_PASS || 'root',
    host: process.env.MONGO_HOST || 'localhost',
    port: process.env.MONGO_PORT || 3306,
    database: process.env.MONGO_DB || 'ysc',
  },
}));
