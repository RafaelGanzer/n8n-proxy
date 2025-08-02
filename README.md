# N8N Proxy para Site de Casamento

Proxy simples para contornar problemas de SSL inválido do N8n, fornecendo endpoints seguros via Vercel.

## Estrutura do Projeto

```
n8n-proxy-casamento/
├── api/
│   ├── buscar-mensagens.js    # GET - Buscar mensagens
│   └── enviar-mensagem.js     # POST - Enviar nova mensagem
├── package.json
├── vercel.json
└── README.md
```

## Endpoints Disponíveis

Após o deploy no Vercel, você terá:

### 1. Buscar Mensagens
```javascript
fetch('https://seu-projeto.vercel.app/api/buscar-mensagens')
  .then(response => response.json())
  .then(data => console.log('Mensagens:', data))
  .catch(error => console.error('Erro:', error));
```

### 2. Enviar Mensagem
```javascript
fetch('https://seu-projeto.vercel.app/api/enviar-mensagem', {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({
    nome: 'Teste',
    email: 'teste@email.com',
    mensagem: 'Mensagem de teste',
    data: new Date().toISOString()
  })
})
.then(response => response.json())
.then(data => console.log('Enviado:', data))
.catch(error => console.error('Erro:', error));
```

## Como Fazer Deploy

1. **Faça upload deste repositório para o GitHub**
2. **Conecte com Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Selecione seu repositório GitHub
   - Deploy automático!

3. **Use os novos endpoints no seu site**

## Configuração

Se precisar alterar as URLs do N8n, edite os arquivos em `/api/`:
- `buscar-mensagens.js` - linha 16
- `enviar-mensagem.js` - linha 16

## Recursos

- ✅ SSL válido automaticamente
- ✅ CORS configurado
- ✅ Logs para debug
- ✅ Tratamento de erros
- ✅ Totalmente gratuito
- ✅ Deploy em minutos
