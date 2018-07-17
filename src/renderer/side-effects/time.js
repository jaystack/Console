export const getNow = (inDateFormat = false) => (inDateFormat ? new Date() : Date.now());

export const sleep = time => new Promise(resolve => setTimeout(resolve, time));
