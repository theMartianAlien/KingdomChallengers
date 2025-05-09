import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loadEnv() {
    console.log(__dirname);
    //dotenv.config({ path: path.resolve(__dirname, '../../.env') });
}