const fs = require('fs');
const path = require('path');

// Criar ícones PNG usando canvas
try {
    const Canvas = require('canvas');
    
    function createIcon(size) {
        const canvas = new Canvas(size, size);
        const ctx = canvas.getContext('2d');
        
        // Fundo gradiente
        const gradient = ctx.createLinearGradient(0, 0, size, size);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
        
        // Arredondar cantos
        ctx.clearRect(0, 0, size, size);
        ctx.beginPath();
        ctx.moveTo(size * 0.1, 0);
        ctx.lineTo(size * 0.9, 0);
        ctx.quadraticCurveTo(size, 0, size, size * 0.1);
        ctx.lineTo(size, size * 0.9);
        ctx.quadraticCurveTo(size, size, size * 0.9, size);
        ctx.lineTo(size * 0.1, size);
        ctx.quadraticCurveTo(0, size, 0, size * 0.9);
        ctx.lineTo(0, size * 0.1);
        ctx.quadraticCurveTo(0, 0, size * 0.1, 0);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Desenhar ícone 🖼️ ou texto
        ctx.fillStyle = 'white';
        ctx.font = `bold ${size * 0.6}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('I', size / 2, size / 2);
        
        // Salvar arquivo
        const buffer = canvas.toBuffer('image/png');
        const filename = path.join(__dirname, `icon${size}.png`);
        fs.writeFileSync(filename, buffer);
        console.log(`✅ Criado: icon${size}.png`);
    }
    
    // Criar ícones em diferentes tamanhos
    createIcon(16);
    createIcon(48);
    createIcon(128);
    
    console.log('✨ Ícones criados com sucesso!');
} catch (e) {
    // Se canvas não estiver instalado, criar ícones de teste
    console.log('⚠️  Canvas não instalado. Criando ícones de teste...');
    
    // Criar ícones simples em base64 (1x1 pixel colorido)
    const colors = {
        16: Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D, 0x49, 0x48, 0x44, 0x52]),
        48: Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x30, 0x49, 0x48, 0x44, 0x52]),
        128: Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x80, 0x49, 0x48, 0x44, 0x52])
    };
    
    console.log('📝 Para criar ícones reais, instale: npm install canvas');
    console.log('Ou coloque suas imagens PNG em: chrome-extension/icons/');
}
