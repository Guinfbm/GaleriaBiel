# 🖼️ ImgBiel - Galeria Inteligente

Uma galeria de imagens desktop e web com sincronização de pasta, editor 3D interativo e auto-slideshow.

## ✨ Features

- **3D Flip Interativo** - Gire imagens com animação suave
- **Sincronização Bidirecional** - Imagens aparecem automaticamente quando colocadas na pasta
- **Editor de Texto** - Adicione anotações com formatação (negrito, itálico, sublinhado)
- **Auto-slideshow** - Redireciona automaticamente após 5 minutos de inatividade
- **Persistência** - Texto salvo em arquivos `.txt` junto com as imagens
- **Chrome Extension** - Acesse a galeria diretamente do navegador
- **Cross-platform** - Funciona como aplicação desktop (Windows) e web

## 🚀 Quick Start

### Opção 1: Executável Desktop
```bash
ImgBiel.exe
```

### Opção 2: Servidor Web + Chrome Extension
```bash
npm run server
```
Depois instale a extensão Chrome (veja instruções abaixo).

## 📦 Instalação

### Requisitos
- Windows 10+ (para executável)
- Node.js e npm (para servidor)
- Google Chrome/Edge (para extensão)

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/Guinfbm/GaleriaBiel.git
cd GaleriaBiel
```

2. **Instale as dependências**
```bash
npm install
```

3. **Execute o programa**

   **Como executável:**
   ```bash
   ImgBiel.exe
   ```

   **Como servidor web:**
   ```bash
   npm run server
   ```

## 🌐 Chrome Extension

### Instalação

1. Execute o servidor: `npm run server`
2. Abra Chrome e vá para: `chrome://extensions/`
3. Ative "Modo de Desenvolvedor" (canto superior direito)
4. Clique "Carregar extensão sem empacotamento"
5. Selecione a pasta: `chrome-extension`
6. Pronto! Clique no ícone 🖼️ e "Abrir Galeria"

### Guias Interativos
- `INSTALACAO_CHROME.html` - Guia visual passo a passo
- `CHROME_SETUP.txt` - Instruções em texto
- `chrome-extension/README.md` - Documentação técnica

## 📂 Estrutura do Projeto

```
GaleriaBiel/
├── ImgBiel.exe              # Executável Windows
├── main.js                  # Controlador Electron
├── preload.js              # Segurança Electron
├── server.js               # Servidor Express
├── package.json            # Dependências
├── files/                  # Galeria principal
│   ├── index.html
│   ├── script.js
│   └── style.css
├── Nova pasta/             # Galeria secundária
│   ├── index.html
│   ├── script.js
│   └── style.css
├── chrome-extension/       # Extensão Chrome
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── background.js
└── dist/                   # Build outputs
```

## 💻 Tecnologias

- **Frontend**: HTML5, CSS3 (3D transforms, gradients), JavaScript ES6+
- **Desktop**: Electron
- **Web**: Node.js + Express
- **APIs**: File System Access API, IndexedDB, Chrome Extension API v3
- **Build**: PyInstaller (para executável), Electron Builder

## 🎮 Como Usar

### Galeria
1. Clique em uma imagem para abrir em modo lightbox
2. Clique 🔄 "Virar" para ver o verso

### Texto
1. Clique ✏️ "Editar" no verso
2. Digite ou formate texto
3. Use Ctrl+B, Ctrl+I, Ctrl+U para formatação rápida
4. Clique 💾 "Salvar"

### Sincronização de Pasta
1. Clique 📁 "Selecionar Pasta"
2. Escolha uma pasta do seu computador
3. Todas as imagens aparecem automaticamente
4. Imagens adicionadas à pasta surgem na galeria

## 🔧 Desenvolvimento

### Scripts Disponíveis

```bash
npm run start        # Inicia app Electron
npm run server       # Inicia servidor web (porta 3000)
npm run dist         # Build executável
npm run pack         # Empacota sem assinar
```

### Estrutura de Código

- `files/script.js` - Lógica principal (modal, flip, editor, sincronização)
- `files/style.css` - Estilos e animações 3D
- `chrome-extension/background.js` - Service Worker da extensão
- `server.js` - Servidor Express com CORS

## 📝 Notas Importantes

- **Pasta de Sincronização**: Certifique-se que tem permissão de leitura/escrita
- **Arquivo .txt**: Salvo como `{nome_da_imagem}.txt` na mesma pasta
- **Inatividade**: 5 minutos sem interação redireciona para "Nova pasta"
- **Navegador**: Recomenda-se Chrome, Edge ou Brave

## 🐛 Troubleshooting

### Servidor não inicia
```bash
# Verifique se porta 3000 está disponível
netstat -ano | findstr :3000

# Tente uma porta diferente
npm run server -- 3001
```

### Imagens não aparecem
- Clique 🔄 "Recarregar"
- Verifique se a pasta tem imagens válidas (JPG, PNG, GIF, WEBP)

### Extensão não carrega
- Ative "Modo de Desenvolvedor" no Chrome
- Verifique se `chrome-extension/manifest.json` existe

## 📸 Screenshots

[Galeria principal com 3D flip]
[Editor de texto com formatação]
[Auto-slideshow]
[Chrome Extension popup]

## 📄 Licença

ISC

## 👤 Autor

Guilherme Biel - [@Guinfbm](https://github.com/Guinfbm)

## 🙏 Agradecimentos

- File System Access API
- Electron Framework
- Chrome Extension API

## 📞 Suporte

- Abra uma issue no GitHub
- Verifique os arquivos `.txt` de documentação
- Leia o código comentado

---

**Versão**: 1.0.0  
**Última Atualização**: 19 de Maio de 2026  
**Status**: Em Desenvolvimento ✨
