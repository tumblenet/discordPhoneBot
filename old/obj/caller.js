function Phone(id, guild, channel, name) {
  this.id = id;
  this.name = name;
  this.guild = guild;
  this.channel = channel;
  this.inCall = false;
  this.noDelete = false;
  this.wwtbam = false;

  console.log("Phone Created: " + this.guild + ", " + this.channel);
}

module.exports = Phone;
