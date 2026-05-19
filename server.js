const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'files')));

// Rota de saúde (para verificar se servidor está rodando)
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor ImgBiel rodando!' });
});

// Rota raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'files', 'index.html'));
});

// Servir Nova Pasta
app.get('/nova-pasta*', (req, res) => {
    const filePath = path.join(__dirname, 'Nova pasta', req.path.replace('/nova-pasta', ''));
    
    if (fs.existsSync(filePath)) {
        if (fs.statSync(filePath).isDirectory()) {
            res.sendFile(path.join(filePath, 'index.html'));
        } else {
            res.sendFile(filePath);
        }
    } else {
        res.status(404).send('Não encontrado');
    }
});

// Tratamento de erro
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 ImgBiel Servidor rodando em http://localhost:${PORT}`);
    console.log(`📁 Galeria: http://localhost:${PORT}`);
    console.log(`🎬 Slideshow: http://localhost:${PORT}/nova-pasta`);
});
