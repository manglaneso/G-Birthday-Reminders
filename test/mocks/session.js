class MockSession {
  constructor() {
    this.activeUser = 'user@domain.com';
  }

  getActiveUser() {
    return this;
  }
  getEmail() {
    return this.activeUser;
  }
}

module.exports = MockSession;