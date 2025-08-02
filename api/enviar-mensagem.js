const fetch = require('node-fetch');
const https = require('https');

export default async function handler(req, res) {
  // Configuração CORS para todas requisições
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    // Respondendo ao preflight OPTIONS
    return res.status(204).end();
  }

  try {
    const N8N_URL = 'https://assistentemir4-n8n-9d372f-207-148-20-179.traefik.me/webhook/enviar-mensagem';

    console.log('Fazendo requisição para:', N8N_URL);
    console.log('Dados recebidos:', req.body);

    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    const response = await fetch(N8N_URL, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'N8N-Proxy/1.0'
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
      agent: httpsAgent
    });

    const data = await response.text();
    console.log('Resposta recebida:', response.status, data.substring(0, 200));

    let responseData;
    try {
      responseData = JSON.parse(data);
    } catch {
      responseData = { message: data };
    }

    return res.status(response.status).json({
      success: response.ok,
      data: responseData,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro no proxy enviar-mensagem:', error);
    return res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
