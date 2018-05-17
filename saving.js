const fs = require('fs');
const githubSave = require('./githubSave.js');

var channelsFile = __dirname + "/data/channels.json";
var phonesFile = __dirname + "/data/phones.json";

function LoadPhoneData(callback=function (data) {}) {
  fs.readFile(phonesFile,(err,data) => {
    if (err | data == "") {
      return data;
    }
    var phonedata = JSON.parse(data);
    callback(phonedata);
  });
}

function SavePhoneData(phoneData) {
  githubSave.SavePhones(phoneData);
  var data = JSON.stringify(phoneData, null, '\t');
  fs.writeFile(phonesFile, data, (err) => {
    if (err) {
      return "There was an error saving Phone data " + err;
    }
    return "Phone data saved";
  });
}

function ExportData() {

}

function ImportData() {

}

module.exports = {
  LoadPhoneData:LoadPhoneData,
  SavePhoneData:SavePhoneData,
  ExportData:ExportData,
  ImportData: ImportData
}
