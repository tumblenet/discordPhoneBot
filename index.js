//require("webserver-log");

const discordbot = require('./discordbot.js');

var token = process.env.DISCORD_TOKEN || require("./config/token.js").token;

discordbot.login(token);
