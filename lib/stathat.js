const stathat = require('stathat');
const console = require('keypunch');

const email = process.env.STATHAT_EMAIL;

function log(stat, value) {
  console.log('Stahat request | ', stat, value);
}

function prefixStatName(name) {
  return `ds_wall ${name}`;
}

module.exports = {
  /**
   * Log a count to stathat.
   *
   * @param {string} stat - Name of the stat.
   * @param {int} count - Count to add.
   */
  count(stat, count) {
    stat = prefixStatName(stat);

    if (!email) {
      log(stat, count);
      return;
    }

    stathat.trackEZCount(email, stat, count);
  },

  /**
   * Log a value to stathat.
   *
   * @param {string} stat - Name of the stat.
   * @param {string} value - value to count.
   */
  value(stat, value) {
    stat = prefixStatName(stat);

    if (!email) {
      log(stat, value);
      return;
    }

    stathat.trackEZValue(email, stat, value);
  },
};
