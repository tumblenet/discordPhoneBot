const Commando = require('discord.js-commando');

const Command = Commando.Command;

class MembersCommand extends Command {
  constructor(client) {
    super(client, {
            name: 'members',
            group: 'phone',
            memberName: 'members',
            description: 'Lists the members in the current call.',
            examples: ['members'],
            guildOnly: true
        });
  }

  run(message,args){
    var data = message.client.data;
    data.getPhone(message.guild, message.channel, phone => {
      if (phone.inCall) {
        data.getCall(phone, call => {
          var memberList = `\n__**List of members in (${call.getName()})**__\`\`\`` + call.members.map(i=>i.name).join("/n") + "```";
          message.reply(memberList);
        });
      }
    });
  }
}

module.exports = MembersCommand;
