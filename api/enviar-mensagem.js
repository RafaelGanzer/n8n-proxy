// api/enviar-mensagem.js
export default async function handler(req, res) {
  // Configuração CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // URL do endpoint N8n para enviar mensagem
    const N8N_URL = 'https://assistentemir4-n8n-9d372f-207-148-20-179.traefik.me/webhook/enviar-mensagem';
    
    console.log('Fazendo requisição para:', N8N_URL);
    console.log('Dados recebidos:', req.body);

    const response = await fetch(N8N_URL, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'N8N-Proxy/1.0'
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
      // Configuração para ignorar SSL inválido no servidor
      agent: undefined // Vercel cuida disso automaticamente
    });

    const data = await response.text();
    console.log('Resposta recebida:', response.status, data.substring(0, 200));
    
    // Tentar parsear como JSON
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