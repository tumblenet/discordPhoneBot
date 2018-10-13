const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');

const Data = require('./obj/data.js');

const client = new Commando.Client({
  commandPrefix: '=t',
  owner:['336869008148135948','339389188787142656'],
  disableEveryone: true,
  unknownCommandResponse: false,
  invite: "https://discord.gg/TWbkwT9"
});

client.registry
    // Registers your custom command groups
    .registerGroups([
        ['phone', 'Phone Commands'],
        ['settings','Settings'],
        ['stats','Statistics']
    ])
    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', ()=> {
  console.log(`Logged in as ${client.user.tag}`);
  client.data = new Data();
  //client.user.setActivity('Calls',{type:"LISTENING"});
  client.data.updateActivity(client);
});

client.on('message', message => {
  var data = client.data;
  data.updateActivity(client);
  if (message.author.bot) {
    return;
  }
  if (message.type != "DEFAULT") {
    return;
  }
  if (message.guild == undefined) {
    return;
  }
  data.getPhone(message.guild, message.channel, phone => {
    if (phone.inCall) {
      data.getCall(phone, call => {
        data.sendMessage(phone, call, message);
      });
      return;
    }
  });
});

module.exports = client;
