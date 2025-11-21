// app.js

// 🔴 ВСТАВТЕ СЮДИ ВАШ УНІКАЛЬНИЙ GOOGLE APPS SCRIPT URL!
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby-S7fDyA4bM1qnu-JcNxf4FSER81Tr2dhq6zcGkomXdtSkr9dHHsm7bQZlyTspoLOE/exec"; 
const statusDiv = document.getElementById('status');
const loadingDiv = document.getElementById('loading');
const userInput = document.getElementById('userInput');

// --- 1. ГОЛОВНА ФУНКЦІЯ ОБРОБКИ ---
async function processInput() {
    const itemName = userInput.value.trim();
    if (!itemName) {
        statusDiv.innerHTML = '<span class="error">Будь ласка, введіть назву товару.</span>';
        return;
    }

    loadingDiv.style.display = 'block';
    statusDiv.innerHTML = '';

    // Для цього прототипу ми пропускаємо UPCitemdb та Gemini,
    // і одразу записуємо тестові дані.
    
    const testData = {
        name: itemName,
        description: `Тестовий опис для: ${itemName}`,
        category: 'Продукти',
        price: (Math.random() * 100).toFixed(2), // Тестова ціна
        timestamp: new Date().toISOString()
    };
    
    try {
        await sendToGoogleSheets(testData);
    } catch (error) {
        statusDiv.innerHTML = `<span class="error">Помилка обробки: ${error.message}</span>`;
    } finally {
        loadingDiv.style.display = 'none';
    }
}

// --- 2. ФУНКЦІЯ ЗАПИСУ У GOOGLE SHEETS ---
async function sendToGoogleSheets(data) {
    statusDiv.innerHTML = `Надсилання даних до Google Sheets...`;
    
    // Google Apps Script очікує дані у вигляді query parameters
    const params = new URLSearchParams(data).toString();
    const url = `${GOOGLE_SCRIPT_URL}?${params}`;

    try {
        const response = await axios.get(url);

        if (response.data && response.data.status === 'success') {
            statusDiv.innerHTML = `<span class="success">✅ УСПІШНО ЗАПИСАНО!</span><br>Отримано відповідь: ${JSON.stringify(response.data)}`;
        } else {
            statusDiv.innerHTML = `<span class="error">Помилка Google Script:</span><br>${JSON.stringify(response.data)}`;
        }
    } catch (error) {
        throw new Error(`Не вдалося підключитися до скрипту. Перевірте URL. Помилка: ${error.message}`);
    }
}
