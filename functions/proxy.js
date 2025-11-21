// functions/proxy.js
const { google } = require('googleapis');
const axios = require('axios'); // Залишаємо на майбутнє для UPCitemdb

// 🔴 ЗМІНІТЬ: ВАШ API KEY та ID ТАБЛИЦІ
const GOOGLE_API_KEY = "AIzaSyA2u_gbftd6bbeuuGg_nSHijrmNHLrQPBw"; 
const SPREADSHEET_ID = "1D2gBISWa4dpYA-BHEtzS0lAlVhQjt9I0HXDmNHQPqQY"; 
const SHEET_NAME = 'ТоварЧек'; // Перевірте назву листа

// Ініціалізація Sheets API з API Key
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
        
        // Перевірка, чи є ім'я, перш ніж записувати
        if (!queryParams.name) {
             return { statusCode: 400, body: JSON.stringify({ status: 'error', message: 'Name parameter is missing' })};
        }

        // 1. Форматуємо дані для запису у рядок
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
            range: `${SHEET_NAME}!A:E`, // Діапазон запису A:E
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [rowData], // Записуємо один рядок даних
            },
        });
        
        // Успішна відповідь
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*", 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: 'success', message: 'Data logged via Sheets API', updates: response.data.updates })
        };

    } catch (error) {
        // Помилки Sheets API будуть тут
        console.error("SHEETS API ERROR:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', message: 'Sheets API call failed', details: error.message })
        };
    }
};
