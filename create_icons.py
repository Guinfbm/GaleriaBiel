"""
Script para gerar ícones PNG para a extensão ImgBiel do Chrome
Requer Pillow: pip install Pillow
"""

from PIL import Image, ImageDraw
import os

def create_icon(size, filename):
    """Criar ícone PNG com fundo gradiente e texto"""
    # Criar imagem RGB
    img = Image.new('RGB', (size, size), color='#667eea')
    draw = ImageDraw.Draw(img)
    
    # Desenhar círculo ou retângulo arredondado
    margin = int(size * 0.1)
    draw.rectangle(
        [(margin, margin), (size - margin, size - margin)],
        fill='#764ba2',
        outline='#667eea',
        width=2
    )
    
    # Salvar arquivo
    output_path = os.path.join(os.path.dirname(__file__), 'chrome-extension', 'icons', filename)
    img.save(output_path, 'PNG')
    print(f'✅ Criado: {filename} ({size}x{size})')

if __name__ == '__main__':
    print('Gerando ícones da extensão ImgBiel...')
    
    try:
        # Criar ícones em diferentes tamanhos
        create_icon(16, 'icon16.png')
        create_icon(48, 'icon48.png')
        create_icon(128, 'icon128.png')
        
        print('\n✨ Todos os ícones foram criados com sucesso!')
        print('📁 Pasta: chrome-extension/icons/')
    except ImportError:
        print('❌ Erro: Pillow não está instalado')
        print('Instale com: pip install Pillow')
    except Exception as e:
        print(f'❌ Erro: {e}')
