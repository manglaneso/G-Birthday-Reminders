class Trigger {
  constructor(uniqueId) {
    this.uniqueId = uniqueId;
  }

  getUniqueId() {
    return this.uniqueId;
  }
}

class MockScriptApp {

  constructor() {
    this.projectTriggers = [];
  }

  getProjectTriggers() {
    return this.projectTriggers;
  }
  newTrigger(name) {
    return this;
  }
  timeBased() {
    return this;
  }
  everyDays(days) {
    return this;
  }
  atHour(hour) {
    return this;
  }
  inTimezone(userTimeZone) {
    return this;
  }
  create() {
    let newTrigger = new Trigger(Math.random().toString(12).substring(2));
    this.projectTriggers.push(newTrigger);
    return newTrigger;
  }

  deleteTrigger(trigger) {
    for(let i = 0; i < this.projectTriggers.length; i++) {
      if(trigger.getUniqueId() == this.projectTriggers[i].getUniqueId()) {
        delete this.projectTriggers[i];
        this.projectTriggers.splice(i, 1);
        break;
      }
    }
  }
}

module.exports = MockScriptApp;