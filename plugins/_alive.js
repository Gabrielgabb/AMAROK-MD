const Amarok = require('../lib/events')
const Config = require('../config')
const { OWNER_NAME, HANDLERS, BOT_NAME } = require('../config.js')
const config = require('../config');
const pjson = require('../package.json')
const { hostname, uptime } = require('os')
const { runtime, getBuffer } = require('../lib/index')

Amarok.addCMD({
         pattern: 'alive',
         isOwner: false,
         desc: '',
   },
   async(conn,match) => {
   
   let [date, time] = new Date()
      .toLocaleString("en-IN", { timeZone: "Africa/Johannesburg" })
      .split(",");
 var CMD_ALIVE = `
 

 *🚦Botname: ${config.BOT_NAME}
 *⌚Date: ${date}
 *🏅Time: ${time}
 *🕸Version: ${pjson.version}
 *👤Owner: ${config.OWNER_NAME}
 *🎗Prefix: ${config.HANDLERS}
 *🏅Useer: ${conn.data.pushName}
 *⌚Working hours: ${runtime(process.uptime())}
`

await conn.sendMessage(conn.chatId, {
      image: { url: 'https://i.ibb.co/6yVCHcL/38aa5206e8bc.jpg', },
      caption: CMD_ALIVE.trim(),
      footer: `amarok-md`,
      buttons: [
        {buttonId: `${PREFIX}menu`, buttonText: {displayText: 'MENU'}},
      {buttonId: `${PREFIX}ping`, buttonText: {displayText: 'PING'}}
    ],
    
    contextInfo: {
				externalAdReply: {
					title:  "AMAROK-MD",
					body: "",
					mediaType: 2,
					thumbnail: await getBuffer('https://i.ibb.co/6yVCHcL/38aa5206e8bc.jpg'),
					mediaUrl: 'https://amarok-deploy.vercel.app',
					sourceUrl: 'https://amarok-deploy.vercel.app',
					showAdAttribution: true
					}
				}
			}, {quoted: conn.data})	});
