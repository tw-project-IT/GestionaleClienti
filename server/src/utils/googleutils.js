const {OAuth2Client} = require("google-auth-library");

const CLIENT_ID = "1056041880555-v4bc1nqh1dn2gmt21hk3tp98uffcpuv2.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        return ticket.getPayload();
    } catch (error) {
        console.error('Token non valido: ', error);
        throw new Error('Token not valid');
    }
}

module.exports = verifyGoogleToken;