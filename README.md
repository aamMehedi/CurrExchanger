# CurrExchanger

A simple currency converter web app that lets users convert between different currencies using the ExchangeRate.host API.

## Features
- Convert amounts between supported currencies
- Display country flags for the selected currencies
- Simple and clean user interface

## Project Structure
- index.html - Main page structure
- style.css - Styling for the app
- inter.js - Main logic for currency conversion
- Country_code.js - Currency-to-country code mapping
- .env - Local API key storage (not committed to GitHub)

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd FirstAPIcall
   ```
2. Open the project folder in your browser.
   - You can open index.html directly, or
   - Use a simple local server if you prefer.
3. Make sure your API key is available locally in the .env file.

## API Key Setup
This project expects an API key in a local .env file.

Create a file named .env in the project root with the following content:

```env
API_KEY=your_api_key_here
```

> Important: The .env file is ignored by Git, so your key stays local.

## How to Use
1. Select the currency you want to convert from.
2. Select the target currency.
3. Enter the amount.
4. Click Convert.

## Technologies Used
- HTML
- CSS
- JavaScript
- ExchangeRate API
- FlagsAPI

## Notes
- This project is beginner-friendly and was created as a first API-based web project.
- If the API key is missing or invalid, conversion may fail.
