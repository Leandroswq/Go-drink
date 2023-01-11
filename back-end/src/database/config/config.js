require('dotenv').config();

// O nome da environment é NODE_ENVS para evitar conflitos
const environment = process.env.NODE_ENVS || "test";

const suffix = {
  prod: "",
  production: "",
  dev: "-dev",
  development: "-dev",
  test: "-test",
};

const options = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || '3306',
  database:
    `${process.env.MYSQL_DB_NAME || 'delivery-app'}${suffix[environment]}`,
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  dialect: 'mysql',
  dialectOptions: {
    timezone: 'Z',
  },
  logging: false,
};

module.exports = options
