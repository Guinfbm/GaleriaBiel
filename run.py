#!/usr/bin/env python3
"""
Wrapper para executar ImgBiel como aplicação Electron
"""
import subprocess
import sys
import os

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    electron_path = os.path.join(script_dir, 'node_modules', '.bin', 'electron.cmd')
    
    if not os.path.exists(electron_path):
        print("❌ Erro: Electron não encontrado!")
        sys.exit(1)
    
    # Executar Electron com o diretório do projeto
    subprocess.run([electron_path, '.'], cwd=script_dir)

if __name__ == '__main__':
    main()
