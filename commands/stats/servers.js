const Tools = require('../../tools.js');

const Command = Tools.commandsBase.command;

class ServersCommand extends Command {
  constructor(client) {
    super(client,{
      name: 'servers',
      group: 'stat',
      memberName: 'servers',
      description: 'Lists the servers I am in',
      examples: ['servers'],
      ownerOnly: true
    });
  }

  run(message, args) {
    var serverArray = message.client.guilds;
    var serverList = Tools.displayList(serverArray,i=>i.name,`__**List of Servers I'm In (${serverArray.size} Servers)**__`);
    message.reply(serverList)
  }
}

module.exports = ServersCommand;
