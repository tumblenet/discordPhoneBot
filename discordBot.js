const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');

const client = new Commando.Client({
  commandPrefix: '=T:',
  owner:'336869008148135948',
  invite: 'https://discord.gg/TWbkwT9'
});

client.registry
    // Registers your custom command groups
    registerGroups([
        ['phone', 'Phone Commands'],
        ['wwtbam', 'Who wants to be a millionare'],
        ['settings', 'Settings'],
        ['info', 'Information and Statistics']
    ])

    // Registers all built-in groups, commands, and argument types
    .registerDefaults()

    // Registers all of your commands in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready',()=> {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

module.exports = client;
