class Phone {
  constructor(id, guildId, channelId, name) {
    this.id = id;
    this.name = name;
    this.guildId = guildId;
    this.channelId = channelId;
    this.callId = null;
    this.noDelete = false;
    this.wwtbam = false;


    this.guild = this.guildId;
    this.channel = this.channelId;
    this.inCall = false;

    console.log("Phone Created: " + this.guildId + ", " + this.channelId);
  }
}

module.exports = Phone;
