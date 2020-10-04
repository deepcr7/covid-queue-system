var admin = require('firebase-admin');

//details of the service account for firebase sdk

var serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ivyhack-oreo.firebaseio.com"
});

console.log("Firebase app working");

const authHandler = (req,res, next) => {
  if(req.headers.authtoken){
    admin
        .auth()
        .verifyIdToken(req.headers.authtoken)
        .then((resultToken) => {
          console.log("result token", resultToken);
          req.user = resultToken;
          next();
        })
        .catch(() => {
          console.log("some problem in the token, unable to decode!")
          return res.status(403).send({
            message: "Unauthorized"
          })
        })
  } else {
    return res.status(403).send({
      message: "No Authtoken has been provided in the header"
    })
  };
};