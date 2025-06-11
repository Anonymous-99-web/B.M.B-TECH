const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR0pZZmdrcnpyNVVLRlNaSFJDOUpPZzF3SjUrYVE2RUNDRXhQTURpZk1YWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0RoR3ptNG81Q1lFZFhWL0FIUk8yT2dSSXcxN09Rb2FvdEVHZERPelhEYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwTHI0STRoeGdyWGxSNjJVSFpPT1o0WEtPeFZLaXFOQUtBVlpGczVoZ0hvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYd1lDdXJWVmFJeFBQSTNHWGhaaWVGVjdiSVlreG9mS0I5R0F3ZHhIakJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRNVzNua1p0OHJlZEMxZis0WXArSkxXQ3VHSnRxaEx6Zk9GZXpJZUo5bjQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlYeGM4Qm4vazdZclpIMnFzK3IyZTBaaitmTGVINlVMb1RraWhYWVhwVEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUZvOXc3NHNsUG9FZzB2TDFubHZMM3ZyVHJ4bmRGM3V3dnMwRm9tc1pXcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia1c2Z2JJck5CbldDT1U5a0pCenh2U0FDQXByQldsSHo3YVBZbG0yN1JYMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImU0VlVabEViaEdKYjVPd0V1WWc0RXhWK1JNcnJSNVcvaVpVbEtLYU1UTVlTT3ZWQXRocW9VOWhmUDN0Y2ZTREhwUFBtNStKcjE0UUg5b1E1RGplTkF3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE3LCJhZHZTZWNyZXRLZXkiOiI5Vk9KazZHUVcvcnZWWGFsL1RzR0VocFpPa3BCLzd0R2h6LzFPdlpybXVZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMzM1MjIwODNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTUzQjRGMDQ0RTg0NDM3RDE1RjkzN0Q4RTVBMzRDMzQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTYzMDg1MX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzMzUyMjA4M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwNEY5OTJDOTk5N0FFNkY5REY5NTM2RTlFMkYwMTVGNyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NjMwODUzfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI5SEQzUDZWTCIsIm1lIjp7ImlkIjoiMjM0ODEzMzUyMjA4MzozM0BzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI2MTMxOTE2NTAxNDEwNTozM0BsaWQiLCJuYW1lIjoiQW5vbnltb3VzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNU1lsS0lCRU8vK3BNSUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJBU2RSYm1uZUcrakxQNHZ0Y2UrMXNOTEFPS3BJYVRBZ3JTWjdwWG1EMTEwPSIsImFjY291bnRTaWduYXR1cmUiOiJXMHcydkNYUEhQV0RoZGxrYzBKNEhzWUM3S0ViZUJEUFJjcHIzRWNuRU8rYjh0T2h3RXhDcGxFYzBUaHU5RXphSi9rdFRhWDVTOHJsazd5Unp4bENDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUE9Ja0t2aFZyWkFCNVhqNFJ2S2VSTVZ0TlQrTU51NW1WYVpzU3RHc1cvTXYwZjhnMFRJdnFFVzlyR1F4SVhBZHBHaGdlaGNqZXhqbS8zNGF2RTZOREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTMzNTIyMDgzOjMzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFFblVXNXAzaHZveXorTDdYSHZ0YkRTd0RpcVNHa3dJSzBtZTZWNWc5ZGQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTYzMDg0NSwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNdnUifQ==',
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
    ANTICALL : process.env.ANTICALL || 'no',   
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

