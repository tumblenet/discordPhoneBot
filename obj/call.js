/**
 * Class rep56resenting a caller45678i9op[]
 asdcfvbnm,./
 * @typedef Call
 * @type {Object}
 * @property {string} id
 * @property {Phone[]} members
 */
class Call {
  /**
   * Create a new phone
   * @param {string} id - Call id for reference when joing directly
   * @param {Phone} phone - The fist phone to join the call
   */
  constructor(id,phone) {
    this.id = id;
    this.members = [];
    this.join(phone);

    console.log("Call Created: (" + this.members.length + ") members");
  }

  /**
   * Join a phone to a Call
   * @param {Phone}
   */
  join(phone) {
    this.members.push(phone);
    phone.inCall = true;
    console.log("Caller (" + phone.name + ") Joined Call (" + this.getName() + ")");
  }

  /**
   * Disconect a phone from a Call
   * @param {Phone}
   */
  leave(phone) {
    var index = this.members.indexOf(phone);
    if (index > -1) {
      this.members.splice(index, 1);
    }
    phone.inCall = false;
  }

  /**
   * Gets the name of a Call
   * @return {string} Name of the call
   */
  getName() {
    return "Call (" + this.members.length + ") members - [" + this.getMembers() + "]";
  }

  /**
   * Gets the members in a Call starting from specified id
   * @param {string} id - Id of phone to start from
   * @return {string} Member list
   */
  getMembers(id=0) {
    if (id == this.members.length || id == 5) {
      return "";
    }
    if (id==0) {
      return this.members[id].name + this.getMembers(id+1)
    }else {
      return ", " + this.members[id].name + this.getMembers(id+1);
    }
  }
}

module.exports = Call;
