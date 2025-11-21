// functions/proxy.js

const { google } = require('googleapis');
const axios = require('axios'); // Залишаємо для отримання даних від UPCitemdb (на майбутнє)

// 🔴 ЗМІНІТЬ: ВАШ API KEY та ID ТАБЛИЦІ
const GOOGLE_API_KEY = "ВАШ_ОСОБИСТИЙ_API_KEY_З_GOOGLE_CLOUD"; 
const SPREADSHEET_ID = "ID_ВАШОЇ_GOOGLE_ТАБЛИЦІ_З_URL"; 
const SHEET_NAME = 'ТоварЧек'; // Назва листа

// Використовуйте цей URL для аутентифікації API Key
const sheets = google.sheets({
    version: 'v4', 
    auth: GOOGLE_API_KEY 
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const queryParams = event.queryStringParameters;

        // 1. Форматуємо дані для запису
        const rowData = [
            new Date().toISOString(),
            queryParams.name,
            queryParams.description || '',
            queryParams.category || '',
            queryParams.price || ''
        ];
        
        // 2. Викликаємо Sheets API (метод append)
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: `${SHEET_NAME}!A:E`, // Діапазон запису
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [rowData], // Записуємо один рядок даних
            },
        });
        
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: 'success', message: 'Data logged via Sheets API', updates: response.data.updates })
        };

    } catch (error) {
        console.error("SHEETS API ERROR:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', message: 'Sheets API call failed', details: error.message })
        };
    }
};
