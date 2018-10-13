const Commando = require('discord.js-commando');

const Command = Commando.Command;

class InviteCommand extends Command {
  constructor(client) {
    super(client, {
            name: 'invite',
            group: 'util',
            memberName: 'invitel',
            description: 'Want to add me to your server?',
            examples: ['invite']
        });
  }

  run(message,args) {
    message.reply("Use this link to add me on your server: http://tnphone.tumblenet.ga/invite/")
  }
}
 module.exports = InviteCommand;
