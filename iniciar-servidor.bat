@echo off
REM Script para iniciar o servidor ImgBiel para Chrome Extension

echo.
echo ╔═══════════════════════════════════════════════╗
echo ║     ImgBiel Chrome Extension - Servidor      ║
echo ╚═══════════════════════════════════════════════╝
echo.

REM Verificar se npm está instalado
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Erro: npm não encontrado!
    echo Instale Node.js em: https://nodejs.org
    pause
    exit /b 1
)

echo ✅ Node.js e npm detectados
echo.
echo 🚀 Iniciando servidor na porta 3000...
echo.
echo 📋 Para usar:
echo    1. Abra o Chrome
echo    2. Vá para chrome://extensions/
echo    3. Ative "Modo de desenvolvedor"
echo    4. Clique "Carregar extensão sem empacotamento"
echo    5. Selecione a pasta: chrome-extension
echo    6. Clique no ícone da extensão
echo    7. Clique "📱 Abrir Galeria"
echo.
echo ⏹️  Pressione Ctrl+C para parar o servidor
echo.

npm run server
