const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0x6bnBIUVBscU9TempMc1RmTkpndUhvVlM0ZjRBOHdXVDAxK1pTTktHMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUmJEU3NDMDJ5Q2ZFUnRnU1lKaDM3QmhGTkxLejM4Z3BCOENGYllYaXR5MD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzSTBSN0N1eDlwWU13TXNBRm1KcjlUOG9VL0dta29rTkhweTlReU45LzNRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQkhUNDE4VW9mMU9udndvTzh4b21DdDM4TlpnZS9aQW80Z3RGdHR5bVJrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtFLzJOZGpyQ1QrR0xXc0RpYkhJWHlWbS9abDRlM0p2cHJvZmlrZ3RHazQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhWSnRpWG1jOWJacUtGSk11M0xuRDNpZUR5SHpaTEhOb0hURkwzNUhkeFk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0VKd2Y1RXcrVkRVWTZxV24rZkRpWUFIeHZmS0V0cW5CS3FWeEdMcnExbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZk1OWFlmcm5uMzFLcEFqaWcrYWV6NW1SYXgxN0tHcXRSaFNLVXFMNnpBcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZCNURnUzY3bHZvNkZGc29WQkszWjVCbU9xT1picWk0WDV1ekpleFBIYVE0NVpnZ2s2NmErNFpzeVlZbTV5MitsZGVHczdQN2tvbk5mMTQwcm1JYUJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTUsImFkdlNlY3JldEtleSI6IkR3N1huMmVnczNSZ1JDa1pTbE53R1NuaFV2Zll5N29QUWxxeDg4WXd4S2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODEzMzUyMjA4M0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3NkM1NTU1NUFBRThEOUY2QUVCQUVFQjA2QzJGMTQ1OCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ5NjEyNzMyfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyMzQ4MTMzNTIyMDgzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjQ1NzI0MjJEMDU1OUE3ODVDQTVCNkEyQUZEQ0I2N0RCIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDk2MTI3MzZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ilk3SzMxQzMzIiwibWUiOnsiaWQiOiIyMzQ4MTMzNTIyMDgzOjMxQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjYxMzE5MTY1MDE0MTA1OjMxQGxpZCIsIm5hbWUiOiJBbm9ueW1vdXMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01LWWxLSUJFS1h4bzhJR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkFTZFJibW5lRytqTFA0dnRjZSsxc05MQU9LcElhVEFnclNaN3BYbUQxMTA9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik13ZEtEemljYWhsdXRxODJaL0VqbUpZZ2pZU3FNYUVxSElkY2ZWcjMwRFEzZW1GcnJuLzJmUFFyemo1R1g5NVlzVGhvbUNlRTlSMGl6YVd1ekVETEN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJWdFFONmhvaW02TVpwZTl5N2g3YWVVZGhZNkY3S3AwbmtvNkRTOHN1UEFmS3lTM3VuOGxoVTN3d1AzRk1pRmJka1kySlRyVXo5ZlZSaVYwTmc0WS9EZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDgxMzM1MjIwODM6MzFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUUVuVVc1cDNodm95eitMN1hIdnRiRFN3RGlxU0drd0lLMG1lNlY1ZzlkZCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ5NjEyNzIyLCJsYXN0UHJvcEhhc2giOiIyUDFZaGYiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU12cSJ9',
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

