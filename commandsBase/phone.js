const Commando = require('discord.js-commando');

const Command = Commando.Command;

class PhoneCommand extends Command {
  run(message,args, inCall,callback){
    var data = message.client.data;
    if (inCall==PhoneCommand.IN_CALL.DOESNT_MATTER) {
      callback(message,args,data,phone);
    }
    else{
      data.getPhone(message.guild, message.channel, phone => {
        if (phone.inCall && (inCall==PhoneCommand.IN_CALL.YES)) {
          data.getCall(phone, call => {
            callback(message,args, data,phone,call);
          });
        } else {
          if (inCall==PhoneCommand.IN_CALL.NO) {
            callback(message,args,data,phone);
          }
        }
      });
    }
  }
}

PhoneCommand.IN_CALL = {
  DOESNT_MATTER:0,
  YES:1,
  NO:2
}

module.exports = PhoneCommand;
