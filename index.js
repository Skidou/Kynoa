const Discord = require('discord.js');
const bot = new Discord.Client();
const cfg = require('./index.json');
const token = process.env.token;
const prefix = ("!");


// const authors = [];
// var warned = [];
// var banned = [];
// var messagelog = [];

// /**
 
//  * @param  {Bot} bot - The discord.js CLient/bot
//  * @param  {object} options - Optional (Custom configuarion options)
//  * @return {[type]}         [description]
//  */
// module.exports = function (bot, options) {
//   // Set options
//   const warnBuffer = (options && options.prefix) || 3;
//   const maxBuffer = (options && options.prefix) || 5;
//   const interval = (options && options.interval) || 1000;
//   const warningMessage = (options && options.warningMessage) || "stop spamming or I'll mute you.";
//   const banMessage = (options && options.banMessage) || "has been muted for spamming";
//   const maxDuplicatesWarning = (options && options.duplicates || 7);
//   const maxDuplicatesBan = (options && options.duplicates || 10);
//   const deleteMessagesAfterBanForPastDays = (options && options.deleteMessagesAfterBanForPastDays || 7);




bot.on('ready', function () {
	console.log("Le bot est pret à etre utilisé !")
	bot.user.setActivity('!inf').catch(console.error)
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
	
	if (message.content === prefix + "inf") {
		var help_embed = new Discord.RichEmbed()
			.setTitle("INFORMATIONS")
			.setColor('#00717D')
			.setDescription("Commands")
			.addField("Steam","[PAGE STEAM](https://store.steampowered.com/app/921960/Koliseum_Soccer_VR/)", true)
			.addField("Kynoa","[KYNOA](https://kynoa.com/)", true)
		message.channel.sendEmbed(help_embed);
		
	}

//Always return with an bot
    if(msg.author.bot) return;

    if(msg.author.id != bot.user.id){
      var now = Math.floor(Date.now());
      authors.push({
        "time": now,
        "author": msg.author.id
      });
      messagelog.push({
        "message": msg.content,
        "author": msg.author.id
      });

      // Check how many times the same message has been sent.
      var msgMatch = 0;
      for (var i = 0; i < messagelog.length; i++) {
        if (messagelog[i].message == msg.content && (messagelog[i].author == msg.author.id) && (msg.author.id !== bot.user.id)) {
          msgMatch++;
        }
      }
      // Check matched count
      if (msgMatch == maxDuplicatesWarning && !warned.includes(msg.author.id)) {
        warn(msg, msg.author.id);
      }
      if (msgMatch == maxDuplicatesBan && !banned.includes(msg.author.id)) {
        ban(msg, msg.author.id);
      }

      matched = 0;

      for (var i = 0; i < authors.length; i++) {
        if (authors[i].time > now - interval) {
          matched++;
          if (matched == warnBuffer && !warned.includes(msg.author.id)) {
            warn(msg, msg.author.id);
          }
          else if (matched == maxBuffer) {
            if (!banned.includes(msg.author.id)) {
              ban(msg, msg.author.id);
            }
          }
        }
        else if (authors[i].time < now - interval) {
          authors.splice(i);
          warned.splice(warned.indexOf(authors[i]));
          banned.splice(warned.indexOf(authors[i]));
        }
        if (messagelog.length >= 200) {
          messagelog.shift();
        }
      }
    }
  });

  /**
   * Warn a user
   * @param  {Object} msg
   * @param  {string} userid userid
   */
  function warn(msg, userid) {
    warned.push(msg.author.id);
    msg.channel.send(msg.author + " " + warningMessage);
  }

  /**
   * Ban a user by the user id
   * @param  {Object} msg
   * @param  {string} userid userid
   * @return {boolean} True or False
   */
  function ban(msg, userid) {
    for (var i = 0; i < messagelog.length; i++) {
      if (messagelog[i].author == msg.author.id) {
        messagelog.splice(i);
      }
    }

    banned.push(msg.author.id);

    var user = msg.channel.guild.members.find(member => member.user.id === msg.author.id);
    if (user) {
      user.ban(deleteMessagesAfterBanForPastDays).then((member) => {
        msg.channel.send(msg.author + " " +banMessage);
        return true;
     }).catch(() => {
        msg.channel.send("insufficient permission to kick " + msg.author + " for spamming.");
        return false;
     });
    }
  }


bot.login(token);
