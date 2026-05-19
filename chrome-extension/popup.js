// Elementos do popup
const openGalleryBtn = document.getElementById('openGallery');
const startServerBtn = document.getElementById('startServer');
const statusDiv = document.getElementById('status');
const statusText = document.getElementById('statusText');

// Função para mostrar status
function showStatus(message, type = 'info') {
    statusText.textContent = message;
    statusDiv.className = `status show ${type}`;
    
    if (type !== 'error') {
        setTimeout(() => {
            statusDiv.classList.remove('show');
        }, 3000);
    }
}

// Abrir galeria em nova aba
openGalleryBtn.addEventListener('click', () => {
    // Verifica se o servidor está rodando
    fetch('http://localhost:3000/health')
        .then(response => {
            if (response.ok) {
                // Servidor está rodando, abre a galeria
                chrome.tabs.create({
                    url: 'http://localhost:3000'
                });
                showStatus('✅ Galeria aberta!', 'success');
            }
        })
        .catch(() => {
            // Servidor não está rodando
            showStatus('⚠️ Inicie o servidor primeiro!', 'error');
        });
});

// Iniciar servidor
startServerBtn.addEventListener('click', () => {
    // Envia mensagem para o background script iniciar o servidor
    chrome.runtime.sendMessage(
        { action: 'startServer' },
        (response) => {
            if (response && response.success) {
                showStatus('✅ Servidor iniciado na porta 3000!', 'success');
                startServerBtn.textContent = '✓ Servidor Rodando';
                startServerBtn.disabled = true;
                
                // Após 2 segundos, permite abrir galeria
                setTimeout(() => {
                    openGalleryBtn.click();
                }, 1000);
            } else {
                showStatus('❌ Erro ao iniciar servidor', 'error');
            }
        }
    );
});

// Verificar status do servidor ao abrir popup
window.addEventListener('load', () => {
    fetch('http://localhost:3000/health')
        .then(response => {
            if (response.ok) {
                startServerBtn.textContent = '✓ Servidor Rodando';
                startServerBtn.disabled = true;
                showStatus('✅ Servidor já está rodando!', 'success');
            }
        })
        .catch(() => {
            // Servidor não está rodando, botão está pronto para usar
        });
});
