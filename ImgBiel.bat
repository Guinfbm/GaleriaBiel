@echo off
setlocal enabledelayedexpansion

REM Obter o diretório do script
set SCRIPT_DIR=%~dp0

REM Executar electron com a aplicação
"%SCRIPT_DIR%node_modules\.bin\electron.cmd" "."

endlocal
pause
