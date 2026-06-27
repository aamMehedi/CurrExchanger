import { countryList } from './Country_code.js';

let apiKeyPromise = null;

async function loadApiKey() {
    if (apiKeyPromise) return apiKeyPromise;

    apiKeyPromise = (async () => {
        try {
            const response = await fetch('./.env', { cache: 'no-store' });
            if (!response.ok) return '';

            const text = await response.text();
            const match = text.match(/^API_KEY\s*=\s*(.+)$/m);
            return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : '';
        } catch (error) {
            console.warn('Could not load API key from .env:', error);
            return '';
        }
    })();

    return apiKeyPromise;
}

const fromSelect = document.querySelector('.from select');
const toSelect = document.querySelector('.to select');
const amountInput = document.querySelector('.from input');
const btn = document.querySelector('.convert-btn');
const result = document.querySelector('.result-value');

const fromFlagImg = document.querySelector('.from img');
const toFlagImg = document.querySelector('.to img');

function formatAmount(value) {
    return Number(value).toLocaleString(undefined, {
        maximumFractionDigits: 6,
    });
}



function setLoading(isLoading) {
    if (isLoading) {
        btn.classList.add('loading');
        btn.disabled = true;
        result.textContent = 'Converting...';
    } else {
        btn.classList.remove('loading');
        btn.disabled = false;
    }
}



async function convertCurrency(from, to, amount) {
    const resolvedApiKey = await loadApiKey();

    let url = `https://api.exchangerate.host/convert?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&amount=${encodeURIComponent(amount)}`;
    if (typeof resolvedApiKey === 'string' && resolvedApiKey.trim() && resolvedApiKey !== 'YOUR_KEY') {
        url += `&access_key=${encodeURIComponent(resolvedApiKey)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    if (!data || data.success === false) {
        const errorMessage = data?.error?.info || JSON.stringify(data);
        throw new Error(errorMessage);
    }
    if (typeof data.result !== 'number') {
        throw new Error('Invalid API response: ' + JSON.stringify(data));
    }
    return data.result;
}



function flagpic(countryCode) {
    const cc = countryList[countryCode];
    return cc ? `https://flagsapi.com/${cc}/flat/32.png` : '';
}
function updateFlag(imgEl, currency) {
    if (!imgEl) return;
    const src = flagpic(currency);
    if (src) imgEl.src = src;
}
// initialize flags and update on change
updateFlag(fromFlagImg, fromSelect?.value);
updateFlag(toFlagImg, toSelect?.value);

fromSelect?.addEventListener('change', () => updateFlag(fromFlagImg, fromSelect.value));
toSelect?.addEventListener('change', () => updateFlag(toFlagImg, toSelect.value));



btn.addEventListener('click', async () => {
    const fromCurrency = fromSelect?.value;
    const toCurrency = toSelect?.value;
    const amount = amountInput?.value.trim();

    const fromFlag = flagpic(fromCurrency);
    const toFlag = flagpic(toCurrency);

    if (!fromCurrency || !toCurrency) {
        result.textContent = 'Select currencies first';
        return;
    }

    const numericAmount = Number(amount);
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
        result.textContent = 'Enter a valid amount';
        return;
    }

    setLoading(true);
    try {
        const converted = await convertCurrency(fromCurrency, toCurrency, numericAmount);
        result.textContent = formatAmount(converted);
    } catch (error) {
        console.error('Conversion failed:', error);
        result.textContent = 'Conversion error';
    } finally {
        setLoading(false);
    }
});
