const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "Toxxic-Boy",
    ownerNumber: process.env.OWNER_NUMBER || "2348165846414",
    mode: process.env.MODE || "public",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "Rias Gremory V3",
    exifPack: process.env.EXIF_PACK || "RIAS V3 LOVES",
    exifAuthor: process.env.EXIF_AUTHOR || "Toxxic",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUFmTXh2RW10alNlRGczOU9XV1k4WElic1BaeDN3Kyt3R3loaHBLenIzTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFFJb0U4ZE5za0wrMEg4dzVlMVVLbk0wVElMV25iUFVhNFhKUlQxR0szOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2RHRCZFcxU1UvME9pMU5vcC83N0xWSTJuYWNJWTJXeXpkVkxmeis4ckhVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOaFJqSnJxemFLMkNWaVpYSlg1L0JmY2Y1YnJjcXovanFXKzQySUEzWDBJPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlQQXBCclpRV2hUbUlrTXgvNjBZOTBPKy95cENpVUZxS2JUb1FYaVNBblE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpYR01EVDBHYW0xcm12T0YxZGhMa2ZyY095KzV3V0tRVzNNbExHWTRCbGc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicVBPZjFkTlkxZ29FMmFMVzA2MkVIOXRab2czeXNqQXA5RVNzNGVqR3VXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmFPUlBZL01mZS9UalpBWmhoeUcza1ZXaC82ME1XaFhlNFRZM3RsdWNnRT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVya0tsM0NqeWZVSGVvSzhQazJCcmdwZU9MYUpOR1prcHlJYTJrYjJVY20rdXE1QUthVUU3WERYRUM5aVd0alhRR0pxdmVINFdIT0l5QzZYSmxqK2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQxLCJhZHZTZWNyZXRLZXkiOiIxZzN5TndoMnJoTXpqOHN3TlZUUXlKaGQyVWxCUERDUlRERXI3bzFtZVdNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzMzU1MzU0NTEwM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI2NTgzQTc3RkJGQjhBMUEyQkYyODAyOTRBQzc1QTk5RiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ0MTI4NjE0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJONUFMQUFOMiIsIm1lIjp7ImlkIjoiMjMzNTUzNTQ1MTAzOjI3QHMud2hhdHNhcHAubmV0IiwibGlkIjoiMjQ0ODE1OTg4NDA5NTU6MjdAbGlkIiwibmFtZSI6IkV4cGxvZGluZyBDaGVlc2UifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05hdTQ0MEVFTldVMWI4R0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkRZZCs2dUdMbXVEZDlHZ0hUY0hHWG9lcTFWT0luaEdYek9uRGE3OGd4Vms9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlYzK2pwdlNJamtDeFZpM2J4aUJTaktISTAwUUNjN2RTd3c0dGVjdjB6d2JCYUEzU3JCWm1oRlByb3FycjUwYXpNd0ZsTWx2bll2cWp5NkFzU2J5RURRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJhNjlFRVZwcFpyUkVTV0k0NHBtRi92NktueFBVb3hha2VwdUZZci80dnRTbm4wMkk4VXpsT1o5ZGRWNlZ0aDF1cnErMFJHc2R2YXNEcm1FWU5OWVVnUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzU1MzU0NTEwMzoyN0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJRMkhmdXJoaTVyZzNmUm9CMDNCeGw2SHF0VlRpSjRSbDh6cHcydS9JTVZaIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJQlE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDQxMjg2MTAsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTTdxIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    Autolevelup: process.env.AUTOLEVELUP?.toLowerCase() === "true" || true,
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`Update detected in '${__filename}', reloading...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
