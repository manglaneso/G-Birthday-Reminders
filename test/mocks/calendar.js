class MockCalendarApp {
  constructor() {
    this.events = ['Event 1', 'Event 2', 'Event 3'];
  }

  getCalendarById(key) {
    return this;
  }
  getEventsForDay(date) {
    return this;
  }
  getName() {
    return this.events[Math.random() * 3]
  }

}

module.exports = MockCalendarApp;