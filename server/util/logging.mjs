const LOGGING = process.env.LOGGING;

export function logMessage(message){
    if(LOGGING === 'verbose') {
        console.log(message);
    }
}