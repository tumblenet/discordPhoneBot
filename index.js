const webserver = require('webserver');

const discordbot = require('./discordbot.js');

webserver(discordbot.app);
const logApp = require("webserver-log");
discordbot.app.use('/log',logApp);

var token = process.env.DISCORD_TOKEN || require("./config/token.js").token;

discordbot.client.login(token);
