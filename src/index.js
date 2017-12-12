// Logman
class Logman {
  constructor(type) {
    if (!window)
      throw Error(
        "Logman is meant to work in browsers. No `window` or `window.console` object found"
      );
    // Set type of the logger
    this.type = type;
    // Indicates sleep mode of logger
    this.isSleep = false;
  }

  _act(action, messages) {
    window.console[action].apply(
      this,
      [`[${this.type}]`].concat([].slice.call(messages))
    );
  }

  log() {
    !this.isSleep && this._act.bind(this, "log")(arguments);
  }

  error(...messages) {
    !this.isSleep && this._act.bind(this, "error")(arguments);
  }

  sleep() {
    this.isSleep = true;
  }

  awake() {
    this.isSleep = false;
  }
}

module.exports = Logman;
