// require dependencies
const Discord = require("discord.js")
const config = require('./config.json');
const fetch = require('node-fetch');

// set up discord client
const client = new Discord.Client()
client.login(config.token)


// log when bot is running
client.once("ready", () => console.log("Ready"))

// check if a json file is valid
client.on("message", message => {
	try {
		var Attachment = (message.attachments)
		if (Attachment && (Attachment.array()[0].name.split('.').pop() == "json")) {
			fetch(Attachment.array()[0].url)
				.then(res => res.text())
				.then((text) => {
					try {
						return (JSON.parse(text) && !!text);
					} catch (e) {
						const embed = new Discord.MessageEmbed()
							.setColor('#cc0000')
							.setTitle("Issues found with your file")
							.setDescription(`${e.message} \n  [Click here to see more detailed information about your file.](https://jsonlint.com)`)
						message.channel.send(embed);
					}
				});
		}
	} catch(error) {}
})