const Tools = require('../../tools.js');

const Command = Tools.commandsBase.phone

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
    super.run(message,args,Command.IN_CALL.YES,(message,args,data,phone,call)=>{
      data.sendText(phone, call, phone.name + " Disconnected");
      call.leave(phone);
      if (call.members.length > 1) {
        data.sendText(phone, call, "How ever you are still in a call and will need to `=hangup` to leave.");
      }
      message.channel.send("Disconnected");
      if (call.members.length == 1) {
        data.getOtherEnd(phone, call, otherEnd => {
          call.leave(otherEnd);
          data.sendText(phone, call, "Disconnected");
        });
      }
      if (call.members.length == 0) {
          var index = data.calls.indexOf(call);
          if (index > -1) {
            data.calls.splice(index, 1);
          }
          message.channel.send("Call closed.");
      }
    });
  }
}

module.exports = HangupCommand;
