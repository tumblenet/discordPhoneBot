class Phone {
  // @deprecated for callID instead
  constructor(id, guildId, channelId, name) {
    this.id = id;
    this.name = name;
    this.guildId = guildId;
    this.channelId = channelId;
    this.callId = null;
    this.inCall = false;
    this.noDelete = false;
    this.wwtbam = false;

    console.log("Phone Created: " + this.guildId + ", " + this.channelId);
  }
}

module.exports = Phone;
