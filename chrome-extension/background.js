// Background Service Worker para ImgBiel Chrome Extension

// Variável para controlar se o servidor está rodando
let serverRunning = false;

// Listener para mensagens da extensão
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'startServer') {
        startServer(sendResponse);
    }
});

// Função para iniciar o servidor local
function startServer(sendResponse) {
    if (serverRunning) {
        sendResponse({ success: true, message: 'Servidor já está rodando' });
        return;
    }

    // Verifica se o servidor já está acessível
    fetch('http://localhost:3000/health')
        .then(response => {
            if (response.ok) {
                serverRunning = true;
                sendResponse({ success: true, message: 'Servidor detectado' });
            }
        })
        .catch(() => {
            // Se não conseguir acessar, assume que o servidor não está rodando
            // A extensão pode ser usada em conjunto com o executável que inicia o servidor
            serverRunning = true;
            sendResponse({ success: true, message: 'Servidor será iniciado' });
        });
}

// Listener para atalhos do teclado (opcional)
chrome.commands.onCommand.addListener((command) => {
    if (command === 'open-gallery') {
        chrome.tabs.create({
            url: 'http://localhost:3000'
        });
    }
});

// Log de ativação da extensão
console.log('ImgBiel Extension ativada!');
