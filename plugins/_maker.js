const Amarok  = require('../lib/events');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const fs = require('fs');
const axios = require('axios');

Amarok.addCMD(
        {      pattern: 'glue ?(.*)',
               isOwner: false,
               desc: 'maker logo with it',
               type: 'user',
     },
     async(conn,match) => {
     match = match[1] 
     if (!match) return await conn.reply('_Need query_');
     var webimage = await axios.get(`https://api.ibeng.tech/api/textpro/neon-light?text=${match[1]}&Revita&apikey=tamvan
     await conn.sendMessage(conn.chatld,Buffer.from(webimage.data), { caption: 'generated by amarok'})
});
