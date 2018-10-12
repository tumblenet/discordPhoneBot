const Commando = require('discord.js-commando');

const Command = Commando.Command;

class CallCommand extends Command {
  constructor(client) {
    super(client, {
            name: 'call',
            group: 'phone',
            memberName: 'call',
            description: 'Creates or joins a call.',
            examples: ['call'],
            guildOnly: true
        });
  }

  run(message,args) {
    var data = message.client.data;
    data.getPhone(message.guild, message.channel, phone => {
      message.channel.send(`Phone Name: ${phone.name}`);
      data.getCall(phone, call => {
        message.channel.send("Joined " + call.getName() + " Call Name:`" + call.id + "`");
        if (call.members.length == 1) {
          message.channel.send("Waiting for Answer")
        } else {
          SendText(phone, call, phone.name + " has joined the call");
          SendText(phone, call, "Use `=hangup` to leave");
          GetOtherEnd(phone, call, otherEnd => {
            message.channel.send("Connected to " + otherEnd.name);
            message.channel.send("Use `=hangup` to leave");
          });
          return;
        }
      });
      data.disposePhone(phone);
    });
  }
}
 module.exports = CallCommand;
