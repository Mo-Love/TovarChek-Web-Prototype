// functions/proxy.js

const { google } = require('googleapis');
// ... інші константи SPREADSHEET_ID, SHEET_NAME залишаються

// --- АВТЕНТИФІКАЦІЯ ---
// Отримуємо JSON-клю зі змінної середовища Netlify
const SERVICE_ACCOUNT_KEY = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY); 

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: SERVICE_ACCOUNT_KEY.client_email,
        private_key: SERVICE_ACCOUNT_KEY.private_key.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Ініціалізація Sheets API з Service Account
const sheets = google.sheets({ version: 'v4', auth });

exports.handler = async (event) => {
    // ... вся логіка залишається та сама ...
    
    try {
        // ... (код отримання параметрів) ...

        // 2. Викликаємо Sheets API (метод append)
        const response = await sheets.spreadsheets.values.append({
            // ... (параметри запису) ...
        });
        
        // ... (успішне повернення) ...

    } catch (error) {
        // ... (обробка помилок) ...
    }
};
