class MockProperties {
  constructor(optStore={}) {
    this.store = optStore;
  }
  
  getProperty(key) {
    return this.store[key];
  }
  setProperty(key, value) {
    this.store[key] = value;
  }
  deleteProperty(key) {
    delete this.store[key];
  }
  getUserProperties() {
    return this;
  }
}

module.exports = MockProperties;