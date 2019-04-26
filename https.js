var greenlock = require('greenlock-express').create({
  server: 'https://acme-v02.api.letsencrypt.org/directory'
, version: 'draft-11'
, configDir: '~/.config/acme/'
, approveDomains: approveDomains
, app: require('./server.js')
});
var server = greenlock.listen(8080, 8443);

function approveDomains(opts, certs, cb) {
  if (certs) {
    opts.domains = [certs.subject].concat(certs.altnames);
  }
  fooCheckDb(opts.domains, function (err, agree, email) {
    if (err) { cb(err); return; }
    opts.agreeTos = agree;
    opts.email = email;
    cb(null, { options: opts, certs: certs });
  });
}

function fooCheckDb(domains, cb) {
  var userEmail = 'contact@foxyninjastudions.com';
  var userAgrees = true;
  cb(null, userAgrees, userEmail);
}
