const Tools = require('../../tools.js');

const Command = Tools.commandsBase.phone

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

  run(message,args) {
    super.run(message,args,data,Command.IN_CALL.YES,(message,args,data,phone,call)=>{
        var title = `\n__**List of members in current call**__`;
        var memberList = Tools.displayList(call.members,i=>i.name,title);
        message.reply(memberList);
    });
  }
}

module.exports = MembersCommand;
