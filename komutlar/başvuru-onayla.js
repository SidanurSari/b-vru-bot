const Discord = require('discord.js');
const db = require('nrc.db');


exports.run = function(client, message, args) {
  let yetkili = db.fetch(`byetkili_${message.guild.id}`)
  if (!message.member.roles.cache.has(yetkili)) return message.channel.send('Bu Komutu Kullanamazsın')
    let adı = args[0]
  let sahip = args[1]
  
    let basvuru = db.fetch(`basvuruk_${message.guild.id}`)
    let kanal = db.fetch(`başvuru-ekle_${message.guild.id}`)
  let log =   db.fetch(`başvuru-log_${message.guild.id}`)
    if(!log) return message.channel.send("Bu komudu kullanmak için yetkili başvuru kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!basvuru) return message.channel.send("Bu komudu kullanmak için yetkili başvuru kanallarının sunucuda ayarlı olması gerekiyor.")
  if(!kanal) return message.channel.send("Bu komudu kullanmak için yetkili başvuru kanallarının sunucuda ayarlı olması gerekiyor.")
  const onay = new Discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(`<@${sahip}> adlı kişinin <@${adı}> adlı kişinini yetkili başvurusunu onayladın.\nOnaylayan yetkili : ${message.author}`)
    
    if (!adı) return message.channel.send(`:no_entry: başvuruun idsini yazmalısın.`).then(msg => msg.delete(10000))
  message.delete()
  if (!sahip) return message.channel.send(`:no_entry: başvuruun sahipinin ID'sini yazmalısın.`).then(msg => msg.delete(10000))
        client.channels.cache.get(log).send(onay)      
  message.channel.send(`başvuruu onayladınız.`).then(msg => msg.delete(1000))
 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['başvuru-onayla', 'onayla'],
  permLevel: 3
};

exports.help = {
  name: 'başvuruonayla', 
  description: "Sunucuya eklenen başvuruu onaylar.",
  usage: 'başvuruonayla <başvuru ismi>'
};