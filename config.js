import path, { dirname } from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const args = process.argv && process.argv.slice(2);
const env = args && args.length > 0 ? args[0] : 'production';

let config; // Define config variable outside try-catch block

try {
    let dotenvPath
    if (env) {
        if (env != 'production')
            dotenvPath = path.resolve(__dirname, `.env.${env}`);
        else
            dotenvPath = path.resolve(__dirname, `.env`);
        // Load environment variables from the specified .env file
        const result = dotenv.config({ path: dotenvPath });
        // Check if loading .env file failed
        if (result.error) {
            throw result.error;
        }
    }

    // Export environment variables
    config = {
        ENV: env,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_URI: process.env.DB_URI,

    };
} catch (error) {
    console.log(error);
}

export default config; // Export config inside try-catch block
