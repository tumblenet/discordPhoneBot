function Call(id, phone) {
  this.id = id;
  this.members = [];
  this.join(phone);

  console.log("Call Created: (" + this.members.length + ") members");
}

Call.prototype.join = function(phone) {
  this.members.push(phone);
  phone.inCall = true;
  console.log("Caller (" + phone.name + ") Joined Call (" + this.getName() + ")");
}

Call.prototype.leave = function (phone) {
  var index = this.members.indexOf(phone);
  if (index > -1) {
    this.members.splice(index, 1);
  }
  phone.inCall = false;
}

Call.prototype.getName = function() {
  return "Call (" + this.members.length + ") members - " + this.id +  " - [" + this.getMembers() + "]";
}

Call.prototype.getMembers = function(id=0) {
  if (id == 5) {
    return;
  }
  if (id==0) {
    return this.members[id] + this.getMembers(id+1);
  }else {
    return ", " + this.members[id] + this.getMembers(id+1);
  }
}

module.exports = Call;
