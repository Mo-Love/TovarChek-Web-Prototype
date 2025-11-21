// functions/proxy.js
const axios = require('axios');

// 🔴 ВСТАВТЕ СЮДИ ВАШ GOOGLE APPS SCRIPT URL!
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-S7fDyA4bM1qnu-JcNxf4FSER81Tr2dhq6zcGkomXdtSkr9dHHsm7bQZlyTspoLOE/exec";

exports.handler = async (event) => {
    // Забезпечуємо, що це GET-запит
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    // Отримуємо параметри запиту, які надіслав клієнт
    const queryString = event.rawQuery;
    const url = `${GOOGLE_SCRIPT_URL}?${queryString}`;

    try {
        // Викликаємо Google Script із серверного середовища Netlify
        const response = await axios.get(url);

        return {
            statusCode: 200,
            // Додаємо CORS-заголовки, щоб Netlify міг повернути відповідь на GitHub Pages
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify(response.data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', message: 'Proxy call to Google Script failed' })
        };
    }
};


