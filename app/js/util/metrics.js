const STORAGE_SESSION_NAME = 'phoenix-session';

// From http://stackoverflow.com/a/21963136
const UUID = (function() {
  var self = {};
  var lut = []; for (var i=0; i<256; i++) { lut[i] = (i<16?'0':'')+(i).toString(16); }
  self.generate = function() {
    var d0 = Math.random()*0xffffffff|0;
    var d1 = Math.random()*0xffffffff|0;
    var d2 = Math.random()*0xffffffff|0;
    var d3 = Math.random()*0xffffffff|0;
    return lut[d0&0xff]+lut[d0>>8&0xff]+lut[d0>>16&0xff]+lut[d0>>24&0xff]+'-'+
      lut[d1&0xff]+lut[d1>>8&0xff]+'-'+lut[d1>>16&0x0f|0x40]+lut[d1>>24&0xff]+'-'+
      lut[d2&0x3f|0x80]+lut[d2>>8&0xff]+'-'+lut[d2>>16&0xff]+lut[d2>>24&0xff]+
      lut[d3&0xff]+lut[d3>>8&0xff]+lut[d3>>16&0xff]+lut[d3>>24&0xff];
  }
  return self;
})();

function getExpiration() {
  return new Date().setMinutes(new Date().getMinutes() + 20);
}

function saveSession(expiration, session) {
  const item = JSON.stringify({
    expiration: getExpiration(),
    value: session,
  });

  localStorage.setItem(STORAGE_SESSION_NAME, item);
}

function createSession(trackingId) {

  const session = {
    user: {
      trackingId: trackingId ? trackingId : UUID.generate(),
      sessionId: UUID.generate(),
    },
    app: {
      version: '1.0.0',
    },
    traffic: {
      entrance: window.location.pathname,
      current: window.location.pathname,
      referer: document.referrer,
    },
  };

  saveSession(getExpiration(), session);

  return session;
}

function getSession() {
  const session = JSON.parse(localStorage.getItem(STORAGE_SESSION_NAME));

  if (!session || !session.expiration) {
    return createSession();
  } else if (session.expiration < new Date()) {
    return createSession(session.value.user.trackingId);
  } else {
    session.value.traffic.current = window.location.pathname;
    saveSession(getExpiration(), session.value);
    return session;
  }
}

let client = false;
let backlog = [];

function defaultHandler(res, err) {}

module.exports = (collection, data, callback) => {
  if (!client) {
    backlog.push({ collection, data });
    return;
  }

  client.recordEvent(collection, {
    session: getSession().value,
    data,
  }, (callback || defaultHandler));
}

KeenAsync.ready(function(){
  client = new KeenAsync({
    projectId: '588fb2418db53dfda8a85091',
    writeKey: '3234DB3AC79F41A809A1C98CA1E7C39943DA0CFCDBA914712D1CA09E20A08195219E4723A23964FA572F1BBBD31749A3C474B0F5D3FB4FFAD6404564239D716E49B2D0D08453CB24C705F596864F3A8A06F0857F4EC90C348FD1A421AC682F4F'
  });

  backlog.forEach(log => module.exports(log.collection, log.data));
  module.exports('view', {});
});
