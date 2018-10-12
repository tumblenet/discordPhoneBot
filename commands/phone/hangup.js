const Commando = require('discord.js-commando');

const Command = Commando.Command;

class HangupCommand extends Command {
  constructor(client) {
    super(client, {
            name: 'hangup',
            group: 'phone',
            memberName: 'hangup',
            description: 'Closes the connection to the call',
            examples: ['hangup'],
            guildOnly: true
        });
  }

  run(message,args){
    var data = message.client.data;
    data.getPhone(message.guild, message.channel, phone => {
      if (phone.inCall) {
        GetCall(phone, call => {
          SendText(phone, call, phone.name + " Disconnected");
          call.leave(phone);
          if (call.members.length > 1) {
            SendText(phone, call, "How ever you are still in a call and will need to `=hangup` to leave.");
          }
          message.channel.send("Disconnected");
          if (call.members.length == 1) {
            GetOtherEnd(phone, call, otherEnd => {
              call.leave(otherEnd);
              SendText(phone, call, "Disconnected");
            });
          }
          if (call.members.length == 0) {
              var index = calls.indexOf(call);
              if (index > -1) {
                calls.splice(index, 1);
              }
              message.channel.send("Call closed.");
          }
          if (!phone.noDelete) {
            var index = phones.indexOf(phone);
            if (index > -1) {
              phones.splice(index, 1);
            }
          }
        });
      }
    });
  }
}

module.exports = HangupCommand;
