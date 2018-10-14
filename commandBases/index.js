const Commando = require('discord.js-commando');

var bases = {
  /**@deprecated use CommandBases.Command */
  command: Commando.Command,
    /**@deprecated use CommandBases.Phone */
  phone: require("./phone.js"),
  Command: Commando.Command,
  Phone: require("./phone.js")
};

module.exports = bases;
