var admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const uid = 'chruch-info';

admin.auth().createCustomToken(uid)
    .then(token => {
        console.log(token);
    })
    .catch(err => {
        console.log('Error: '+ error)
    })