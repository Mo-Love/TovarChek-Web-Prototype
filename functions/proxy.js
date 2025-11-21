// functions/proxy.js
const axios = require('axios');

// 🔴 ВСТАВТЕ СЮДИ ВАШ GOOGLE APPS SCRIPT URL!
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQiAChBC9048ktPw7DjSM1_W-PXkx3qYKx_BWPNnJjb0LB5TVTgZtLl59BR9vNodS6/exec";

exports.handler = async (event) => {
    // ... (решта логіки)
    const url = `${GOOGLE_SCRIPT_URL}?${queryString}`;
    // ...
};
