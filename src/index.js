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
    // Soft destroy
    this.isDestroyed = false;
  }

  _act(action, messages) {
    window.console[action].apply(
      this,
      [`[${this.type}]`].concat([].slice.call(messages))
    );
  }

  _isActive() {
    try {
      return (
        process &&
        process.env &&
        process.env.NODE_ENV !== "production" &&
        !this.isSleep &&
        !this.isDestroyed
      );
    }
    catch(err) {return false;}
  }

  log() {
    this._isActive() && this._act.bind(this, "log")(arguments);
  }

  error(...messages) {
    !this._isActive() && this._act.bind(this, "error")(arguments);
  }

  sleep() {
    this.isSleep = true;
  }

  awake() {
    this.isSleep = false;
  }

  destroy() {
    this.isDestroyed = true;
  }
}

module.exports = Logman;
