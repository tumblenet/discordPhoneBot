
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

Tools.MakeID = function(data) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  do {
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  } while (data.phoneIdExists(text));

  return text;
}

module.exports = Tools;
