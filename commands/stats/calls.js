const Tools = require("../../tools.js");

const Command = Tools.commandsBase.command;

class CallsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'calls',
      group: 'stat',
      memberName: 'calls',
      description: 'Lists the current calls',
      examples: ['calls'],
      ownerOnly: true
    });
  }

  run(message,args) {
    var callsArray = message.client.data.calls;
    var callsList = Tools.displayList(callsArray,i=>i.getName(), `__**List of current calls (${callsArray.size} calls)**__`);
    message.replay(callsList);
  }
}
