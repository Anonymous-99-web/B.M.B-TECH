const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUorc1UwZS9GMjBRTUtENmNES1gvZmxnTndtaUg0dGRONjhFZkIrN2RtND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2lhYm5tQjloOEM1clhxakthWDd2K3FCOFhleHh4cWdKSHR3YmY4Z2dERT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpSU1XLzE2Z2k2eS9iS2xNWlRhS1FNSkVUclBzZmE0NjhCc0w3NG9OMUhzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4aHhrM2VPMUgrTDEyTkQzQWJjaWI3NE1FMEJDcWVqQXRmc0haNUlyL0NzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjBCL0JmRGNXVUZQa2x3THduYVY2bGtBL0hjWnlJVzFEeXlrMVNYNStnVVU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inh2RnNZMk9tbmNVMTBIV2t4Q0ZWdHdQVWp3YXc4UjRLa0YvY1VuRHlMeDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUc4Rk9hNjAzc0UxcnE4Q3VYQ25SRDlGb0VIRUI1TnFhb2NLQ1lUb0xXRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0JaZHZ5ckcyNmFoV2Ywc1lkL3V4WUl0c1RlOVU0QVhKcEpHcFp6L1pUYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ing3aU0rclcvNWFtb2Jpak44OXN1TEEva3ZTSUpVc1g5YWdSL2pwMTFCbTdWeEpiekh3elAralJVTEd4Ry9kSUZ2Tk1xbmVidWxCUXozUmJvM3o2VWhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiI4dnk0TVJ2YzZWZkRidWY2MVd0K1pxQW5RK2FLNHBISnRuaENFVVZpdVFjPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxMzM1MjIwODNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQkYyMzM0OTE5MjdGQjJBMjhEM0M4Nzg3NzQ4RjVFMDYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0OTUxMDM1OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzMzUyMjA4M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQUUyMTU2RkRGMDFFMzdCMERCQjZDMUJDMjhFMEE2MyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NTEwMzYxfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJQNVZWTUREVyIsIm1lIjp7ImlkIjoiMjM0ODEzMzUyMjA4MzoyOUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjI2MTMxOTE2NTAxNDEwNToyOUBsaWQiLCJuYW1lIjoiQW5vbnltb3VzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNQ1lsS0lCRU1IUm5jSUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJBU2RSYm1uZUcrakxQNHZ0Y2UrMXNOTEFPS3BJYVRBZ3JTWjdwWG1EMTEwPSIsImFjY291bnRTaWduYXR1cmUiOiJsMTF0UVFUaEo2Ymc3YzVwVVlkS2pDTlZRbTJkaDRTbXFXaCt1NjlJK1BYNmxNVk9EMGlWQTFaNS8rMzZsV3NvU2FqMEdzVnI5dlFPcTZPclZtS09Edz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiakV1M0wxc2E2UjcvU2dZRjJUWjhUbnNZUEcrWlBvMVd1Z05qS3BTamR4MjRENGlSenRwREk3SzFZM0EraDlhVEsvaGZLc2pnejVOejNXU25OVmwramc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTMzNTIyMDgzOjI5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlFFblVXNXAzaHZveXorTDdYSHZ0YkRTd0RpcVNHa3dJSzBtZTZWNWc5ZGQifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCSUlCUT09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0OTUxMDM1MCwibGFzdFByb3BIYXNoIjoiMlAxWWhmIiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPbUEifQ==',
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

