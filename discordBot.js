const Discord = require('discord.js');
const Commando = require('discord.js-commando');

const client = new Commando.Client({
  owner:'336869008148135948'
})

client.on('ready',()=> {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

module.exports = client;
