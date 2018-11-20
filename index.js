const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./index.json');
const token = process.env.token;
const prefix = ("/");

bot.on('ready', function () {
	console.log("Le bot est pret à etre utilisé !")
	bot.user.setActivity('/help').catch(console.error)
  });
// SEULEMENT POUR VOIR SI LE BOT EST PRET OU PAS 

bot.on('guildMemberAdd', member => {
	member.createDM().then(channel => {
		return channel.send('Welcome to Koliseum Soccer VR discord channel' + member.displayName)
		console.log('${member.displayName } à rejoint le serveur.')  // Je ne vois pas d'ou vient l'erreur.
	}).catch(console.error)
});

// ACCUEIL LES NOUVEAUX MEMBRES

bot.on('message', function (message) {
	
	if (message.content === prefix + "help") {
		var help_embed = new Discord.RichEmbed()
			.setTitle("HOW TO PLAY")
			.setColor('#7d0c00')
			.setDescription("Please see in the Announcements channel")
		message.channel.sendEmbed(help_embed);
		
	}
	
	if (message.content === prefix + "help") {
		var help_embed = new Discord.RichEmbed()
			.setTitle("GENERAL INFORMATIONS")
			.setColor('#00717D')
			//.setDescription("Commands")
			.addField("Steam","[PAGE STEAM](https://store.steampowered.com/app/921960/Koliseum_Soccer_VR/)", true)
			.addField("Kynoa","[KYNOA](https://kynoa.com/)", true)
		message.channel.sendEmbed(help_embed);
		
	}
	
	
	
	

});

// DIFFERENTES COMMANDES

bot.login(token);
