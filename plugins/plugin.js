const Amarok = require("../lib/events");
const got = require("got");
const fs = require("fs");
const { PluginDB, installPlugin } = require("./SQL/plugin");

Amarok.addCMD(
	{
		pattern: "install ?(.*)",
		isOwner: true,
		desc: "Install plugins",
		type: "misc",
		},
		async (message, match) => {
			match = match[1] || message.reply_msg
			if (!match) return await message.reply("Example:\n\nplugin url");
			try {
				var url = new URL(match);
				} catch (e) {
					console.log(e);
					return await message.reply("_Give valid link_");
					}
					if (url.host === "gist.github.com") {
						url.host = "gist.githubusercontent.com";
						url = url.toString() + "/raw";
						} else {
							url = url.toString()
							}
							var plugin_name;
							var { body, statusCode } = await got(url);
							if (statusCode == 200) {
								var plugin_name = body.match(/addCMD\({.*pattern: ["'](.*)["'].*}/);
									if (!plugin_name) {
										plugin_name = "__" + Math.random().toString(36).substring(8);
      }
      fs.writeFileSync(__dirname + "/" + plugin_name + ".js", body);
      try {
      	require("./" + plugin_name);
      	} catch (e) {
      		fs.unlinkSync(__dirname + "/" + plugin_name + ".js");
      		return await message.reply("Invalid Plugin\n ```" + e + "```");
      		}
      		await installPlugin(url, plugin_name);
      		await message.reply(`_New plugin installed : ${plugin_name}_`);
      		}
      		}
      		);

Amarok.addCMD(
	{ 
		pattern: "plugin", 
		isOwner: true,
		desc: "Returns installed plugins",
		type: "misc" 
		},
  async (message, match) => {
  	var mesaj = "";
  	var plugins = await PluginDB.findAll();
  	if (plugins.length < 1) {
  		return await message.reply("Plugin not installed");
  		} else {
  			plugins.map((plugin) => {
        mesaj +=
          "```" +
          plugin.dataValues.name +
          "```: " +
          plugin.dataValues.url +
          "\n";
          });
      return await message.reply(mesaj);
      }
      }
      );

Amarok.addCMD(
	{
		pattern: "remove(?: |$)(.*)",
		isOwner: true,
		desc: "Remove plugin",
		type: "misc",
  },
  async (message, match) => {
  	match = match[1]
  	if (!match) return await conn.reply("_Need a plugin name_");
  	var plugin = await PluginDB.findAll({ where: { name: match } });
  	if (plugin.length < 1) {
  		return await message.reply("_Plugin not found_");
  		} else {
  			await plugin[0].destroy();
  			delete require.cache[require.resolve("./" + match + ".js")];
  			fs.unlinkSync(__dirname + "/" + match + ".js");
  			await message.reply(`Plugin ${match} deleted`);
  			}
  			}
  			);
