// Elementos do DOM
const amountInput = document.getElementById('amount');
const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const convertButton = document.getElementById('convertButton');
const swapButton = document.getElementById('swapButton');
const resultContainer = document.getElementById('resultContainer');
const resultValue = document.getElementById('resultValue');
const exchangeRate = document.getElementById('exchangeRate');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const lastUpdate = document.getElementById('lastUpdate');
const buttonText = document.getElementById('buttonText');
const buttonLoader = document.getElementById('buttonLoader');

// Configuração da API
const API_BASE_URL = 'https://open.er-api.com/v6/latest';

// Cache para armazenar taxas de câmbio
let exchangeRatesCache = {};
let lastFetchTime = null;
const CACHE_DURATION = 3600000; // 1 hora em milissegundos

// Função para buscar taxas de câmbio da API
async function fetchExchangeRates(baseCurrency) {
    try {
        // Verificar se temos cache válido
        const now = Date.now();
        if (exchangeRatesCache[baseCurrency] && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
            return exchangeRatesCache[baseCurrency];
        }

        const response = await fetch(`${API_BASE_URL}/${baseCurrency}`);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.result === 'error') {
            throw new Error(data['error-type'] || 'Erro desconhecido da API');
        }

        // Armazenar no cache
        exchangeRatesCache[baseCurrency] = data;
        lastFetchTime = now;

        // Atualizar informação de última atualização
        updateLastUpdateInfo(data.time_last_update_utc);

        return data;
    } catch (error) {
        console.error('Erro ao buscar taxas de câmbio:', error);
        throw error;
    }
}

// Função para converter moeda
async function convertCurrency() {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    // Validação
    if (isNaN(amount) || amount <= 0) {
        showError('Por favor, insira um valor válido maior que zero');
        return;
    }

    // Desabilitar botão e mostrar loader
    setLoadingState(true);
    hideError();
    hideResult();

    try {
        // Buscar taxas de câmbio
        const data = await fetchExchangeRates(fromCurrency);

        // Verificar se a moeda de destino está disponível
        if (!data.rates[toCurrency]) {
            throw new Error(`Moeda ${toCurrency} não disponível`);
        }

        // Calcular conversão
        const rate = data.rates[toCurrency];
        const convertedAmount = amount * rate;

        // Exibir resultado
        displayResult(amount, fromCurrency, convertedAmount, toCurrency, rate);

    } catch (error) {
        showError('Erro ao converter moeda. Tente novamente mais tarde.');
        console.error('Erro na conversão:', error);
    } finally {
        setLoadingState(false);
    }
}

// Função para exibir o resultado
function displayResult(amount, fromCurrency, convertedAmount, toCurrency, rate) {
    // Formatar valores
    const formattedAmount = formatCurrency(amount, fromCurrency);
    const formattedResult = formatCurrency(convertedAmount, toCurrency);
    const formattedRate = rate.toFixed(4);

    // Atualizar DOM
    resultValue.textContent = formattedResult;
    exchangeRate.textContent = `1 ${fromCurrency} = ${formattedRate} ${toCurrency}`;

    // Mostrar container de resultado com animação
    resultContainer.classList.add('show');
}

// Função para formatar moeda
function formatCurrency(value, currency) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// Função para trocar moedas
function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;

    // Se já houver um resultado, converter automaticamente
    if (resultContainer.classList.contains('show')) {
        convertCurrency();
    }
}

// Função para mostrar erro
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    hideResult();
}

// Função para esconder erro
function hideError() {
    errorMessage.classList.add('hidden');
}

// Função para esconder resultado
function hideResult() {
    resultContainer.classList.remove('show');
}

// Função para definir estado de carregamento
function setLoadingState(isLoading) {
    convertButton.disabled = isLoading;
    
    if (isLoading) {
        buttonText.classList.add('hidden');
        buttonLoader.classList.remove('hidden');
    } else {
        buttonText.classList.remove('hidden');
        buttonLoader.classList.add('hidden');
    }
}

// Função para atualizar informação de última atualização
function updateLastUpdateInfo(lastUpdateUtc) {
    if (lastUpdateUtc) {
        const date = new Date(lastUpdateUtc);
        const formattedDate = date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        lastUpdate.textContent = `Última atualização: ${formattedDate}`;
    }
}

// Event Listeners
convertButton.addEventListener('click', convertCurrency);

swapButton.addEventListener('click', swapCurrencies);

// Permitir conversão ao pressionar Enter no input de valor
amountInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertCurrency();
    }
});

// Esconder resultado quando mudar seleção de moedas
fromCurrencySelect.addEventListener('change', () => {
    if (resultContainer.classList.contains('show')) {
        hideResult();
    }
});

toCurrencySelect.addEventListener('change', () => {
    if (resultContainer.classList.contains('show')) {
        hideResult();
    }
});

// Esconder resultado quando mudar valor
amountInput.addEventListener('input', () => {
    if (resultContainer.classList.contains('show')) {
        hideResult();
    }
    hideError();
});

// Inicialização: fazer uma conversão padrão ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    console.log('Conversor de Moedas carregado com sucesso!');
    // Opcional: fazer conversão automática ao carregar
    // convertCurrency();
});
