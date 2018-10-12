const Tools = require('../tools.js');
const Phone = require('./phone.js');
const Call = require('./call.js');

class Data {
  constructor() {
      this.callsMade = 0;
      this.phones = [];
      this.calls = [];
  }

  callIdExists(id) {
    var found = false;
    this.calls.forEach(call => {
      if (found) {
        return;
      }
      if (call.id == id) {
        found = true;
      }
    });
    return found;
  }

  phoneIdExists(id) {
    var found = false;
    this.phones.forEach(phone => {
      if (found) {
        return;
      }
      if (phone.id == id) {
        found = true;
      }
    });
    return found;
  }

  getPhoneFromID(phoneid, callback) {
    var found = false;
    this.phones.forEach(phone => {
      if (found) {
        return;
      }
      if (phoneid==phone.id) {
        found = true;
        callback(phone);
      }
    });
  }

  getPhone(guild, channel, callback) {
    var found = false;
    this.phones.forEach(phone => {
      if (found) {
        return;
      }
      if (phone.guildId==guild.id && phone.channelId==channel.id) {
        found = true;
        callback(phone);
      }
    });
    if (!found) {
      var id = Tools.MakeID(this);
      var phone = new Phone(id, guild.id, channel.id, guild.toString() + "" + channel.toString())
      this.phones.push(phone);
      callback(phone);
    }
  }

  getCall(phone, callback) {
    var found = false;
    this.calls.forEach(call => {
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
      var id = Tools.MakeID(this);
      var call = new Call(id,phone);
      this.callsMade++;
      this.calls.push(call);
      callback(call);
      return;
    }
  }

  getCallID(phone,id, callback) {
    var found = false;
    this.calls.forEach(call => {
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
      this.calls.push(call);
      callback(call);
      return;
    }
  }

  disposePhone(phone) {
    if (phone.inCall && !phone.noDelete) {
      var index = this.phones.indexOf(phone);
      if (index > -1) {
        this.phones.splice(index, 1);
      }
    }
  }


  //TODO:DEPRICATE ------------------------------------

  getOtherEnd(sender, call, callback) {
    call.members.forEach(member => {
      if (member != sender) {
        callback(member);
      }
    });
  }

  sendText(sender, call, text, client) {
    call.members.forEach(member => {
      if (member != sender) {
        var tools = new Tools(client);
        tools.getGuild(member.guild, guild =>{
          tools.getChannel(guild, member.channel, channel => {
            console.log("Sending \"" + text + "\"  from " + sender.name + " to " + member.name + " via " + call.getName());
            channel.send(text);
          });
        });
      }
    });
  }
  sendMessage(sender, call, message) {
    call.members.forEach(member => {
      if (member != sender) {
        var tools = new Tools(message.client);
        tools.getGuild(member.guild, guild =>{
          tools.getChannel(guild, member.channel, channel => {
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
  //---------------------------------------------------------------
}

module.exports = Data;
