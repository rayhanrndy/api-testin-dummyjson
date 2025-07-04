require('dotenv').config();

export default {
    baseUrl: process.env.BASE_URL,
    userName: process.env.USER_NAME,
    passWord: process.env.PASS_WORD
    // expireInMins: process.env.EXPIREINMINS
}