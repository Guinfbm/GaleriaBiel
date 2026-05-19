@echo off
REM 📋 Script de teste da extensão ImgBiel para Chrome

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║  🧪 TESTE RÁPIDO - ImgBiel Chrome Extension         ║
echo ╚══════════════════════════════════════════════════════╝
echo.

REM Verificar Node.js
echo Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js não encontrado!
    echo Baixe em: https://nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js encontrado

REM Verificar npm
echo Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm não encontrado!
    pause
    exit /b 1
)
echo ✅ npm encontrado

REM Verificar pasta chrome-extension
if not exist "chrome-extension" (
    echo ❌ Pasta chrome-extension não encontrada!
    pause
    exit /b 1
)
echo ✅ Pasta chrome-extension encontrada

REM Verificar arquivos necessários
setlocal enabledelayedexpansion
set missing=0

for %%F in (manifest.json popup.html popup.js background.js) do (
    if not exist "chrome-extension\%%F" (
        echo ❌ Arquivo chrome-extension\%%F não encontrado
        set missing=1
    ) else (
        echo ✅ chrome-extension\%%F
    )
)

if %missing% equ 1 (
    echo.
    echo ❌ Alguns arquivos estão faltando!
    pause
    exit /b 1
)

REM Verificar server.js
if not exist "server.js" (
    echo ❌ Arquivo server.js não encontrado!
    pause
    exit /b 1
)
echo ✅ server.js encontrado

REM Verificar pasta files
if not exist "files" (
    echo ❌ Pasta files não encontrada!
    pause
    exit /b 1
)
echo ✅ Pasta files encontrada

echo.
echo ╔══════════════════════════════════════════════════════╗
echo ║  ✅ TODOS OS ARQUIVOS ESTÃO CORRETOS!               ║
echo ╚══════════════════════════════════════════════════════╝
echo.

echo 🚀 Iniciando servidor em http://localhost:3000...
echo.
echo 📋 PRÓXIMOS PASSOS:
echo.
echo 1. Deixe este terminal aberto
echo.
echo 2. Abra o GOOGLE CHROME
echo.
echo 3. Digite: chrome://extensions/
echo.
echo 4. Ative "MODO DE DESENVOLVEDOR" (canto superior direito)
echo.
echo 5. Clique "CARREGAR EXTENSÃO SEM EMPACOTAMENTO"
echo.
echo 6. Selecione a pasta:
echo    C:\Users\guilh\Desktop\imgBiel\chrome-extension
echo.
echo 7. Clique no ícone 🖼️ da extensão
echo.
echo 8. Clique "📱 Abrir Galeria"
echo.
echo ⏹️  Pressione Ctrl+C para parar
echo.

npm run server
