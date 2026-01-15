const date = new Date();

const iso = date.toISOString();
const utc = date.toUTCString();
const dateString = date.toDateString();
const str = date.toString();

console.log({ iso, utc, dateString, str });
