const Tools = require('../../tools.js');

const Command = Tools.commandsBase.phone

class CallCommand extends Command {
  constructor(client) {
    super(client, {
            name: 'call',
            group: 'phone',
            memberName: 'call',
            description: 'Creates or joins a call.',
            examples: ['call','call the-greatest-meeting','call nose'],
            guildOnly: true,
            args:[{
              key: "callId",
              label: "Call ID",
              prompt:"Prompt for call id argument",
              type: "string",
              default: "",
            }],
            argsCount: 1
        });
  }

  run(message,args) {
    super.run(message,args,Command.IN_CALL.NO,(message, args, data, phone)=>{
      message.channel.send(`Phone Name: ${phone.name}`);
      var handleCall = call => {
        message.channel.send("Joined " + call.getName() + " Call Name:`" + call.id + "`");
        if (call.members.length == 1) {
          message.channel.send("Waiting for Answer")
        }
        else {
          data.sendText(phone, call, phone.name + " has joined the call", message.client);
          data.sendText(phone, call, "Use `=hangup` to leave", message.client);
          data.getOtherEnd(phone, call, otherEnd => {
            message.channel.send("Connected to " + otherEnd.name);
            message.channel.send("Use `=hangup` to leave");
          });
        }
      }
      var id = args.callId
      if (id=="") {
        data.getCall(phone,handleCall)
      } else {
        data.getCallID(phone,id,handleCall)
      }
      data.disposePhone(phone);
    });
  }
}
 module.exports = CallCommand;
