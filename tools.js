
class Tools {
  constructor(client) {
    this.client = client;
  }

  getGuild(guildid,callback) {
    console.log("Finding guild: " + guildid);
    var found = false;
    this.client.guilds.forEach(guild => {
      if (found) {
        return;
      }
      if (guild.id == guildid) {
        found = true;
        console.log("Found Guild: " + guild.name + " (" + guildid + ")");
        callback(guild);
      }
    });
  }

  getChannel(guild, channelid, callback) {
    var found = false;
    guild.channels.forEach(channel => {
      if (found) {
        return;
      }
      if (channel.id == channelid) {
        found = true;
        console.log("Found Channel: " + guild.name + "#" + channel.name + " (" + channel.id + ")");
        callback(channel);
      }
    });
  }
}

Tools.Depricate = function(oldValue,msg="Something has depricated.", solutions = "No alternative has been provided to use") {
  var warningMsg = msg + " ";
  var finishUp = ()=> {
    warningMsg += " instead.";
    process.emitWarning(
      warningMsg,
      'DeprecationWarning'
    );
  }

  if (Array.isArray(solutions) && solutions.length>1) {
    solutions.forEach((solution,i,array)=>{
      if (i==0) {
        warningMsg += `Use \`${solution}\`, or preferably`;
      } else if (i==array.length-1) {
        if (i==1) {
          warningMsg += `\`${solution}\``;
        } else {
          warningMsg += ` or \`${solution}\``;
        }
      } else {
        warningMsg += `, \`${solution}\``;
        finishUp();
      }
    });
  } else {
    warningMsg += `Use \`${solutions}\``;
    finishUp();
  }

  return oldValue;
}

Tools.MakeID = function(data) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  do {
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  } while (data.phoneIdExists(text));

  return text;
}

Tools.DisplayList = function(array, map, title="") {

  var wrapper = "```"
  var list = array.map(map).join("\n");
  var body = wrapper + list + wrapper;
  if (title=="") {
    return body;
  } else{
    return title + "\n" + body;
  }
}
Tools.CommandBases = require("./commandBases");

/** @deprecated use Tools.DisplayList instead **/
Tools.displayList = Tools.Depricate(Tools.DisplayList,"Tools.displayList will no longer work","Tools.DisplayList");

/** @deprecated use Tools.CommandBases instead **/
Tools.commandsBase = Tools.Depricate(Tools.CommandBases,"Tools.commandsBase will no longer work","Tools.CommandBases");
module.exports = Tools;
