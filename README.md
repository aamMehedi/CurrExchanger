# CurrExchanger

A simple currency converter web app that lets users convert between different currencies using the ExchangeRate API.

## Features
- Convert amounts between supported currencies
- Display country flags for the selected currencies
- Simple and clean user interface
- Uses real exchange rates from ExchangeRate.host
- Works in the browser with only client-side HTML/CSS/JS

---

## 📁 Project Structure

- `index.html` - Main page structure
- `style.css` - Styling for the app
- `inter.js` - Main logic for currency conversion
- `Country_code.js` - Currency-to-country code mapping
- `.env` - Local API key storage (not committed to GitHub)

---

## 🏃 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/aamMehedi/CurrExchanger.git
   cd FirstAPIcall
   ```
2. Open the project folder in your browser:
   - Open `index.html` directly, or
   - Use a simple local server if you prefer.
3. Add your API key to a local `.env` file.

---

## 🔑 API Key Setup

Create a file named `.env` in the project root with the following content:

```env
API_KEY=your_api_key_here
```

> Important: The `.env` file is ignored by Git, so your key stays local.

---

## 🧭 How to Use

1. Select the currency you want to convert from.
2. Select the target currency.
3. Enter the amount.
4. Click `Convert`.
5. See the converted amount and flags update instantly.

---

## 🛠 Technologies Used

- HTML
- CSS
- JavaScript
- ExchangeRate API

## 📌 Notes

- This project is beginner-friendly and was created as a first API-based web app.
- If the API key is missing or invalid, conversion may fail.
- Add a local `.env` file to keep your API key private.
