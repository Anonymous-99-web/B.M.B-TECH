const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMktRNkJQbUZra1NHd2l5TzBLZWxEMGtzbzdvNFcyODlQNXFKMmMzTGRIOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMCs5cjIzWk1iMTdvMFVzQUprMWtpWmhWRlErZGFTY09DVUhOeUlOMmNuQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0TU1LelNOcFFDVGR6WGRYcHU2dysyNkl1R0xEWmRQVnFRZjJaZnRrL21NPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFL3JjOFo4MmRheDZ3ZURRRncyRFYvck8wUmc0TkdBOGFaY2ZEM24wdUJzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlPSld1aml0V3o4YjNQSzZTbjUxVE1uSldTcitlZy9SWmtBSy9IUHBMRms9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVSRzcvbWNmRW5ud3I2d0NCbTlrL2pnQnZzb09hR2Y2ZUJIVU9QRklUdzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUFVV0VvQVI5RVdFS3VoNkl6bXlpZjV5M1JHS1lTRmNJUGlhNFJRaXBsWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYXFiOXlzWEtZcDBONG1EUEY0TUxiZDBzR2ViUUM5aTNVRzl3bHhwNFNYQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhpM3lWb2QwT0w5TjI3czI4eXBDd3ZnVUVXNDIycG45VldmYnpjT0NZSWYwWktHMVRTc2VMK2hFbFdtSlgrd1hZV05uK0F2Mk56clhmSER0VlgvREJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjIzLCJhZHZTZWNyZXRLZXkiOiJKLzhNTm54YWhQVXcrSjRub0lSeFFKbFR4K0luVEgwMGJ2NTQ2TUJUcWJZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMzM1MjIwODNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOTA5REU0MUVENjI2OUVEQThEQ0M5MDYyMkVDM0IxN0EifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTM3NzU4OH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzMzUyMjA4M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJEQTcyNDk0NDRBM0M5MjMzNDhENTNFOTIwQzA4QjMxMCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5Mzc3NTkxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiIzUTlMSlg0VyIsIm1lIjp7ImlkIjoiMjM0ODEzMzUyMjA4MzoyM0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI2MTMxOTE2NTAxNDEwNToyM0BsaWQiLCJuYW1lIjoiQW5vbnltb3VzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMdVlsS0lCRUtURWxjSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJBU2RSYm1uZUcrakxQNHZ0Y2UrMXNOTEFPS3BJYVRBZ3JTWjdwWG1EMTEwPSIsImFjY291bnRTaWduYXR1cmUiOiJDbnNkWStZb3A4akU3K01wRkMyd0hKb25NTVAyelJDNW5NUlhzSEVBTm5CeTVmb3REUTlWYkpXZ1Y2cWZES3A5R2llWktzb2thMURxd1Y0dEd5VWNEQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOEFjOUhSaUd2K2hrYVU5N3l0UGNRVVQ5RUxqMmFxeWZWalFLWFdCSmtNZjBlcUJCWGNaMmNBRTZmUFRKUW9sZnZFQ25xYk5lYStFRWQxTkhhSFNSQ0E9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTMzNTIyMDgzOjIzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFFblVXNXAzaHZveXorTDdYSHZ0YkRTd0RpcVNHa3dJSzBtZTZWNWc5ZGQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTM3NzU4NSwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNY0wifQ==',
    PREFIXE: process.env.PREFIX || "*",
    OWNER_NAME: process.env.OWNER_NAME || "Anonymous",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " 𝙱.𝙼.𝙱-𝚇𝙼𝙳 ke",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Anonymous-Bot',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

