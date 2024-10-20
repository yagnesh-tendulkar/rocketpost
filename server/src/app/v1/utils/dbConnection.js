import config from "../../../../../config.js";
import logger from "../../../../../logger.js";
import sql from 'mssql'
const DbConfig = {
  server: config?.DATABASE_HOST,
  database: config?.DATABASE_NAME,
  user: config?.DATABASE_USER,
  password: config?.DATABASE_PASSWORD,
  options: {
    enableArithAbort: true,
    encrypt: true,
  },
};

const poolPromise = (async () => {
  try {
    return await sql.connect(DbConfig)
  } catch (err) {
    logger.info("Database Connection Failed! Bad Config: ", err);
    throw err;
  }
})();

export { poolPromise };
