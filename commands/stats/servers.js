const Tools = require('../../tools.js');

const Command = Tools.commandsBase.command;

class ServersCommand extends Command {
  constructor(client) {
    super(client,{
      name: 'servers',
      group: 'stats',
      memberName: 'servers',
      description: 'Listes the servers I am in',
      examples: ['servers'],
      ownerOnly: true
    });
  }

  run(messgae,args) {
    var serverListArray = client.guilds;
    var serverList = Tools.displayList(serverListArray,i=>i.name,`__**List of Servers I'm In (${serverListArray.toArray().length} Servers)**__`);
    message.reply(serverList)
  }
}
