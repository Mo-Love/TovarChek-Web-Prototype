// functions/proxy.js
const axios = require('axios');

// 🔴 ВСТАВТЕ СЮДИ ВАШ GOOGLE APPS SCRIPT URL!
const GOOGLE_SCRIPT_URL = "ВАШ_УНІКАЛЬНИЙ_GOOGLE_APPS_SCRIPT_URL";

exports.handler = async (event) => {
    // ... (решта логіки)
    const url = `${GOOGLE_SCRIPT_URL}?${queryString}`;
    // ...
};
