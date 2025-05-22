import { loadEnv } from "./configLoader.mjs";
loadEnv();

const LOGGING = process.env.LOGGING;

export function logMessage(message){
    if(LOGGING === 'verbose') {
        console.log(message);
    }
}

export function logError(message) {
    console.log(message);
}