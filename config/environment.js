const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
});



const development={
    name:'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'Webingo_development',
    google_client_id: '969728859789-16b51bn8etc2q1h6cidkgg66f4lfrj9q.apps.googleusercontent.com',// e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: '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', // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_call_back_url: "http://webingoconnect.com/users/auth/google/callback",
    jwt_secret: 'webingo',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
}
const production={
    name:'production',
    asset_path: process.env.WEBINGO_ASSET_PATH,
    session_cookie_key: process.env.WEBINGO_SESSION_COOKIE_KEY,
    db: process.env.WEBINGO_DB,
    google_client_id: process.env.WEBINGO_GOOGLE_CLIENT_ID,// e.g. asdfghjkkadhajsghjk.apps.googleusercontent.com
    google_client_secret: process.env.WEBINGO_GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%KFJWIASDFASD#FAD-
    google_call_back_url: process.env.WEBINGO_CALL_BACK_URL,
    jwt_secret: process.env.WEBINGO_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
    
}

module.exports= eval(process.env.WEBINGO_ENVIRONMENT)==undefined? development:eval(process.env.WEBINGO_ENVIRONMENT);