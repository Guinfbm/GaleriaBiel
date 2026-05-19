# ImgBiel - Aplicação Desktop

✅ **Executável criado com sucesso!**

## 📦 Como usar

### Opção 1: Executável Direto (Recomendado)
Double-click no arquivo **`ImgBiel.exe`** para iniciar a aplicação.

### Opção 2: Via Node.js
Se preferir usar via terminal:
```bash
npm start
```

---

## 🎯 Funcionalidades

✨ **Galeria de Imagens com 3D Flip**
- Clique em qualquer imagem para abrir em modo lightbox
- Clique no botão "🔄 Virar" para ver o verso em 3D

📁 **Sincronização de Pasta**
- Selecione uma pasta do seu computador
- Todas as imagens carregadas vão para esta pasta
- Toda imagem adicionada à pasta aparece automaticamente na galeria

📝 **Editor de Texto com Formatação**
- Clique no verso de uma imagem e "✏️ Editar"
- Adicione texto com **negrito**, *itálico*, <u>sublinhado</u>
- O texto é salvo automaticamente como arquivo `.txt` na pasta

⏱️ **Auto-slideshow**
- Após 5 minutos de inatividade, a aplicação abre a "Nova pasta"
- Qualquer clique/movimento reseta o timer

---

## 📋 Arquivos Importantes

```
imgBiel/
├── ImgBiel.exe          ← Clique aqui para iniciar! 🎯
├── ImgBiel.bat          ← Alternativa (via cmd)
├── main.js              ← Controlador Electron
├── preload.js           ← Segurança do Electron
├── package.json         ← Configurações do projeto
├── files/               ← Galeria principal
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── [suas imagens]
├── Nova pasta/          ← Galeria secundária (slideshow)
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   ├── tick.mp3
│   └── [suas imagens]
└── dist/                ← Pasta de build
    └── ImgBiel.exe      ← Cópia do executável
```

---

## 🔧 Requisitos

- Windows 10 ou superior (64-bit)
- Pasta com imagens em formato: JPG, PNG, JPEG, GIF, WEBP

---

## 📱 Controles

| Ação | Efeito |
|------|--------|
| Double-click imagem | Abre lightbox |
| 🔄 Virar | Alterna frente/verso |
| ✏️ Editar | Ativa editor de texto |
| 💾 Salvar | Guarda texto e formatação |
| Ctrl+B | Negrito |
| Ctrl+I | Itálico |
| Ctrl+U | Sublinhado |

---

## 🐛 Troubleshooting

**O aplicativo não inicia?**
- Verifique se tem permissão de leitura/escrita na pasta
- Tente rodar como Administrador

**Imagens não aparecem?**
- Verifique se estão em uma pasta acessível
- Recarregue com o botão 🔄

**Texto não salva?**
- Certifique-se que a pasta tem permissão de escrita
- Verifique se o nome do arquivo não tem caracteres inválidos

---

**Criado em:** 19/05/2026  
**Versão:** 1.0.0  
**Tecnologia:** Electron + Node.js + Python  
