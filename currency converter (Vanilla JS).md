💱 Currency Converter (Vanilla JS)

A simple and minimalist web application for real-time currency conversion, built with pure JavaScript (Vanilla JS), HTML, and CSS.
The project uses the free ExchangeRate-API
 to fetch the latest exchange rates.

✨ Features

Real-Time Conversion: Get updated exchange rates for accurate conversions.

Currency Selection: Choose from major global currencies for conversion.

Intuitive Interface: Clean, responsive, and easy-to-use layout.

Quick Swap: Instantly swap the base and target currencies with one click.

Smart Caching: Exchange rates are cached for 1 hour to optimize performance and reduce API requests.

No Dependencies: Built entirely with HTML, CSS, and JavaScript — no frameworks or external libraries required.

🚀 How to Use

To run this project locally, all you need is a web browser and a simple local server.
You can use Python to quickly start a local server.

Clone or download this repository:

git clone https://github.com/your-username/js-currency-converter.git
cd js-currency-converter


Start a local server:

If you have Python 3 installed, run the following command in the project directory:

python3 -m http.server 8080


Open in your browser:

Go to http://localhost:8080 in your browser to start using the converter.

🛠️ How It Works

The application follows these steps:

User Input: The user enters the amount to convert and selects the base and target currencies.

API Request: Upon clicking "Convert", the JavaScript code makes a fetch request to the ExchangeRate-API, using the base currency as a reference.

Calculation: The exchange rate for the target currency is extracted from the API response and used to calculate the converted value.

DOM Display: The formatted result, exchange rate, and last update time are dynamically displayed on the page.

📸 Conversion Examples
Example 1: Converting BRL to USD

Example 2: Swapping Currencies

The swap button reverses the base and target currencies and recalculates the value automatically.

Example 3: Converting a Different Amount

🧾 Credits

API: Exchange rates provided by ExchangeRate-API
.

Developed by: Rodrigo Marchi Gonella.