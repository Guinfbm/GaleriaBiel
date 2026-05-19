# 📦 ImgBiel Chrome Extension

Extensão do Google Chrome para acessar sua galeria ImgBiel diretamente do navegador!

## 🚀 Como Instalar

### Passo 1: Extrair a extensão
A pasta `chrome-extension` contém todos os arquivos da extensão.

### Passo 2: Abrir Chrome
1. Abra o **Google Chrome**
2. Digite `chrome://extensions/` na barra de endereço
3. Ative o **"Modo de desenvolvedor"** (canto superior direito)

### Passo 3: Carregar a extensão
1. Clique em **"Carregar extensão sem empacotamento"**
2. Selecione a pasta `chrome-extension`
3. A extensão aparecerá com o ícone 🖼️

## 💻 Como Usar

### Opção 1: Com o Servidor Local (Recomendado)
```bash
# Terminal 1: Inicie o servidor
npm run server

# Terminal 2: Clique no ícone da extensão no Chrome
# → Clique "🚀 Iniciar Servidor" 
# → Clique "📱 Abrir Galeria"
```

### Opção 2: Com o Executável
```bash
# Execute o ImgBiel.exe primeiro
ImgBiel.exe

# Depois clique na extensão do Chrome
# → Clique "📱 Abrir Galeria"
```

## 📋 Arquivos da Extensão

```
chrome-extension/
├── manifest.json          ← Configuração da extensão
├── popup.html            ← Interface do popup
├── popup.js              ← Lógica do popup
├── background.js         ← Service worker
└── icons/                ← Ícones da extensão
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## ✨ Funcionalidades

✅ **Abrir Galeria em Nova Aba**
- Clique no ícone da extensão
- Clique "📱 Abrir Galeria"

✅ **Iniciar Servidor Local**
- Clique "🚀 Iniciar Servidor"
- Automático ao usar `npm run server`

✅ **Integração Perfeita**
- Sincronização de pasta
- Editor 3D com texto
- Auto-slideshow
- Todas as features do ImgBiel

## 🔧 Requisitos

- Google Chrome v90+
- Node.js com npm (para servidor)
- Ou executável ImgBiel.exe

## 🐛 Troubleshooting

**"Servidor não está rodando"**
```bash
npm run server
# Deixe o terminal aberto enquanto usa a extensão
```

**Extensão não aparece?**
1. Vá em `chrome://extensions/`
2. Ative "Modo de desenvolvedor"
3. Clique "Carregar extensão sem empacotamento"
4. Selecione `chrome-extension`

**CORS Error?**
- Certifique-se que o servidor está rodando na porta 3000
- Verifique: http://localhost:3000

## 📱 Atalhos

| Ação | Resultado |
|------|-----------|
| Clique no ícone 🖼️ | Abre popup da extensão |
| 🚀 Iniciar Servidor | Inicia servidor local |
| 📱 Abrir Galeria | Abre galeria em nova aba |

## 🎯 Próximas Atualizações

- [ ] Context menu para compartilhar imagens
- [ ] Sincronização automática com Drive/OneDrive
- [ ] Dark mode
- [ ] Atalhos customizáveis

---

**Versão:** 1.0.0  
**Compatibilidade:** Chrome 90+, Edge 90+, Brave  
**Licença:** ISC  
