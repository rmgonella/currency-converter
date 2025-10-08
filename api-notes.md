# API de Conversão de Moedas - ExchangeRate-API

## Informações Principais

### Open Access Endpoint (Sem chave de API)
- **URL Base**: `https://open.er-api.com/v6/latest/USD`
- **Sem necessidade de API Key**
- **Requer atribuição** (link no site)
- **Atualização**: Uma vez por dia
- **Rate Limit**: Pode fazer requisições a cada hora sem ser limitado
- **Formato**: JSON

### Exemplo de Requisição
```
GET https://open.er-api.com/v6/latest/USD
```

### Exemplo de Resposta
```json
{
    "result": "success",
    "provider": "https://www.exchangerate-api.com",
    "documentation": "https://www.exchangerate-api.com/docs/free",
    "terms_of_use": "https://www.exchangerate-api.com/terms",
    "time_last_update_unix": 1585872397,
    "time_last_update_utc": "Fri, 02 Apr 2020 00:06:37 +0000",
    "time_next_update_unix": 1585959987,
    "time_next_update_utc": "Sat, 03 Apr 2020 00:26:27 +0000",
    "time_eol_unix": 0,
    "base_code": "USD",
    "rates": {
        "USD": 1,
        "AED": 3.67,
        "ARS": 64.51,
        "AUD": 1.65,
        "BRL": 5.20,
        "CAD": 1.42,
        "CHF": 0.97,
        "CNY": 7.1,
        "EUR": 0.919,
        "GBP": 0.806,
        "JPY": 110.5,
        ...
    }
}
```

### Moedas Suportadas
- Usa códigos ISO 4217 (3 letras)
- Exemplos: USD, EUR, BRL, GBP, JPY, etc.

### Atribuição Necessária
```html
<a href="https://www.exchangerate-api.com">Rates By Exchange Rate API</a>
```

### Rate Limiting
- HTTP 429 se exceder limite
- Bloqueio dura 20 minutos
- Recomendado: requisitar a cada 24h ou pelo menos a cada hora
