const Discord = require('discord.js');
const client = new Discord.Client();

const Saving = require('./saving.js');

const Phone = require('./obj/caller.js');
const Call = require('./obj/call.js');

const OWNER_ID = "336869008148135948";
const WWTBAM_PID = "wwtbampaf";

var phones = [];
var calls = [];



function callIdExists(id) {
  var found = false;
  calls.forEach(call => {
    if (found) {
      return;
    }
    if (call.id == id) {
      found = true;
    }
  });
  return found;
}
function phoneIdExists(id) {
  var found = false;
  phones.forEach(phone => {
    if (found) {
      return;
    }
    if (phone.id == id) {
      found = true;
    }
  });
  return found;
}

function makeID(test) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  do {
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  } while (test(text));

  return text;
}

function GetGuild(guildid,callback) {
  console.log("Finding guild: " + guildid);
  var found = false;
  client.guilds.forEach(guild => {
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

function GetChannel(guild, channelid, callback) {
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

function GetPhoneFromID(phoneid, callback) {
  var found = false;
  phones.forEach(phone => {
    if (found) {
      return;
    }
    if (phoneid==phone.id) {
      found = true;
      callback(phone);
    }
  });
}

function GetPhone(guild, channel, callback) {
  var found = false;
  phones.forEach(phone => {
    if (found) {
      return;
    }
    if (phone.guild==guild.id && phone.channel==channel.id) {
      found = true;
      callback(phone);
    }
  });
  if (!found) {
    var id = makeID(phoneIdExists);
    var phone = new Phone(id, guild.id, channel.id, guild.toString() + "" + channel.toString())
    phones.push(phone);
    callback(phone);
  }
}

function GetCall(phone, callback) {
  var found = false;
  calls.forEach(call => {
    if (phone.inCall) {
      if (found) {
        return;
      }
      if (call.members.includes(phone)) {
        found = true;
        callback(call);
        return;
      }
    }
    if (call.members.length == 1&& !call.members.includes(phone)) {
      call.join(phone);
      found = true
      callback(call);
      return;
    }
  });
  if (!found) {
    var id = makeID(callIdExists);
    var call = new Call(id,phone);
    calls.push(call);
    callback(call);
    return;
  }
}

function GetCallID(phone,id, callback) {
  var found = false;
  calls.forEach(call => {
    if (call.id != id) {
      return;
    }
    if (!call.members.includes(phone)) {
      call.join(phone);
      found = true
      callback(call);
      return;
    }
  });
  if (!found) {
    var call = new Call(id,phone);
    calls.push(call);
    callback(call);
    return;
  }
}

function GetOtherEnd(sender, call, callback) {
  call.members.forEach(member => {
    if (member != sender) {
      callback(member);
    }
  });
}

function SendText(sender, call, text) {
  call.members.forEach(member => {
    if (member != sender) {
      GetGuild(member.guild, guild =>{
        GetChannel(guild, member.channel, channel => {
          console.log("Sending \"" + text + "\"  from " + sender.name + " to " + member.name + " via " + call.getName());
          channel.send(text);
        });
      });
    }
  });
}

function SendMessage(sender, call, message) {
  call.members.forEach(member => {
    if (member != sender) {
      GetGuild(member.guild, guild =>{
        GetChannel(guild, member.channel, channel => {
          console.log("Sending \"" + message.content + "\" from " + sender.name + " to " + member.name + " via " + call.getName());
          var sendertext = "**" + message.member.user.tag + "**";
          if (call.members.length > 2) {
            sendertext = "**[" + sender.name +  "] " + message.member.user.tag + "**";
          }
          channel.send(sendertext + ": " +  message.content);
        });
      });
    }
  });
}


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setPresence({ game: { name: 'Type =help for commands' }, status: 'online' })

  Saving.LoadPhoneData(function (data) {
    phones = data;
  });
  setInterval(() => {
    Saving.SavePhoneData(phones);
  },6000);
});

client.on('message', message => {
  if (message.guild == undefined) {
    return;
  }
  if (message.member == message.guild.me) {
    return;
  }

  //Detect if in a call
    //detect if user asked to hang up
      //hang up
    //if the user did not hang up
      //send message to other channel
  //if not in a call
    //detect if user asked to call
    if (message.content == "=help") {
      message.reply("**Commands**\n```\n=call - Make a call\n=call [name] - Join a specific call\n=calls - See Active Calls\n=hangup - Disconnect from current call\n=invite - put this phone on your own server\n=members - see members of this call\n```")
      return;
    }
  if (message.content == "=owner") {
    message.channel.send("The owner of this bot is <@" + OWNER_ID + ">")
    return;
  }
  if (message.content == "=invite") {
    message.reply("Use this link to add me on your server: https://discordapp.com/api/oauth2/authorize?client_id=446367231740215317&permissions=67622976&scope=bot")
    return;
  }
  if (message.member.id == OWNER_ID) {
    if (message.content == "=calls") {
      if (calls.length == 0) {
          message.channel.send("There are no calls");
      }
      calls.forEach(call => {
        message.channel.send(call.id + " - " + call.getName())
      })
      return;
    }
    if (message.content == "=phones") {
      if (phones.length == 0) {
          message.channel.send("There are no phones");
      }
      phones.forEach(phone => {
        message.channel.send("`" + phone.id + "` " + phone.name);
      })
      return;
    }
  }

  GetPhone(message.guild,message.channel,phone => {
    if (message.user = OWNER_ID) {
      if (message.content.startsWith("=phone")) {
        var paramsText = message.content.replace("=phone ","");
        var params = paramsText.split(" ");
        switch (params.shift()) {
          case "setid":
            var newid = params.shift();
            var phoneId = params.shift();
            if (phoneId != undefined) {
              GetPhoneFromID(phoneId, queriedphone => {
                if(phoneIdExists(newid)){
                  message.channel.send("The id `" + newid + "` is taken");
                } else{
                  queriedphone.id = newid;
                  message.channel.send("Phone id set to " + queriedphone.id);
                }
              });
              return;
            }
            if(phoneIdExists(newid)){
              message.channel.send("The id `" + newid + "` is taken");
            } else {
              phone.id = newid;
              message.channel.send("Phone id set to " + phone.id);
            }
            break;
          case "nodelete":
            phone.noDelete = !phone.noDelete;
            message.channel.send("Phone NoDelete is set to `" + phone.noDelete +"`");
            break;
          case "wwtbam":
            phone.wwtbam = !phone.wwtbam;
            message.channel.send("Phone WWTBAM is set to `" + phone.wwtbam +"`");
            break;
          default:
            message.channel.send("**Phone " + phone.id + "**\nName: " + phone.name + "\ninCall: `" + phone.inCall + "`\nnoDelete: `" + phone.noDelete + "`\nwwtbam: `" + phone.wwtbam + "`")
        }
      }
    }
    if (message.content == "=wwtbam") {
      if (message.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR,null,true,true)) {
        phone.noDelete = !phone.wwtbam;
        phone.wwtbam = !phone.wwtbam;
        if (phone.wwtbam) {
          message.channel.send("The phone \"" + phone.name + "\" is now a <@445534047612043264> phone and will be called automaticaly.\n Please keep mind that you cannot call out from this phone")
        } else {
          message.channel.send("This is now a normal phone, ringing out is now possible.")
        }
      } else {
        message.reply("Only admins can run this command")
      }
    }
    if (phone.inCall) {
      GetCall(phone, call => {
          if (message.content == "=members") {
            call.members.forEach(member =>{
              message.channel.send(member.name);
            });
            return;
          }
          if (message.content == "=hangup") {
            SendText(phone, call, phone.name + " Disconnected");
            SendText(phone, call, "How ever you are still in a call and will need to `=hangup` to leave.");
            call.leave(phone);
            if (call.memebers.length == 1) {
              GetOtherEnd(phone, call otherEnd => {
                call.leave(otherEnd);
                SendText(phone, call, "Disconnected");
              });
            }
            if (call.members.length == 0) {
                var index = calls.indexOf(call);
                if (index > -1) {
                  calls.splice(index, 1);
                }
            }
            message.channel.send("Disconnected");
            if (!phone.noDelete) {
              var index = phones.indexOf(phone);
              if (index > -1) {
                phones.splice(index, 1);
              }
            }
            return;
          }
        SendMessage(phone, call, message);
      });
      return;
    } else {
      if (!phone.wwtbam && phone.id != WWTBAM_PID) {
        if (message.content.startsWith("=call ")) {
          var id = message.content.replace("=call ","");
          message.channel.send("Phone Name: " + phone.name);
          GetCallID(phone, id, call => {
            message.channel.send("Joined " + call.getName() + " Call Name:`" + call.id + "`");
            if (call.members.length == 1) {
              message.channel.send("Waiting for Answer")
            } else {
              SendText(phone, call, phone.name + " joined the call");
              SendText(phone, call, "Use `=hangup` to leave");
              GetOtherEnd(phone, call, otherEnd => {
                message.channel.send("Connected to " + otherEnd.name);
                message.channel.send("Use `=hangup` to leave");
              });
              return;
            }
            return;
          });
          return;
        }
        if (message.content == "=call") {
          message.channel.send("Phone Name: " + phone.name);
          GetCall(phone, call => {
            message.channel.send("Joined " + call.getName() + " Call Name:`" + call.id + "`");
            if (call.members.length == 1) {
              message.channel.send("Waiting for Answer")
            } else {
              SendText(phone, call, phone.name + " has joined the call");
              SendText(phone, call, "Use `=hangup` to leave");
              GetOtherEnd(phone, call, otherEnd => {
                message.channel.send("Connected to " + otherEnd.name);
                message.channel.send("Use `=hangup` to leave");
              });
              return;
            }
          });
          return;
        }
      }
      if (phone.id == WWTBAM_PID) {
        if (message.content.startsWith("!paf")) {
          var paramsText = message.content.replace("!paf ","");
          var params = paramsText.split(" ");

          var id = params.shift()
          if (id == "!paf") {
            var found = false;
            phones.forEach(phone => {
              if (phone.wwtbam) {
                if (found == false) {
                  message.channel.send("**Who would you like to call**")
                }
                found = true;
                message.channel.send(phone.name + " - (`!paf " + phone.id + "`)")
              }
            })
            if (!found) {
              message.channel.send("There are no Phone A Friend phones available.")
            }
            return;
          }
          GetPhoneFromID(id, otherphone => {
            if (!otherphone.wwtbam) {
              message.send("The phone `" + otherphone.id + "` is not involved in phone a friend.");
              return;
            }
            GetCall(phone, call => {
              call.join(otherphone);
              message.channel.send("Joined " + call.getName() + " Call Name:`" + call.id + "`");
              if (call.members.length == 1) {
                message.channel.send("Waiting for Answer")
              } else {
                SendText(phone, call, "Someone has requested for phone a friend");
                SendText(phone, call, "Use `=hangup` to leave");
                GetOtherEnd(phone, call, otherEnd => {
                  message.channel.send("Connected to " + otherEnd.name);
                  message.channel.send("Use `=hangup` to leave");
                });
                return;
              }
              return;
            });
          });
          return;
        }
      }
      if (!phone.noDelete) {
        var index = phones.indexOf(phone);
        if (index > -1) {
          phones.splice(index, 1);
        }
      }
    }

  });
});

module.exports = client;
