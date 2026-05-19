// Dados de exemplo das imagens
const pins = [];

// Estado de favoritos (armazenado em localStorage)
const favorites = JSON.parse(localStorage.getItem('favorites')) || {};

// Imagens carregadas pelo usuário
const userImages = JSON.parse(localStorage.getItem('userImages')) || [];

// Variável para rastrear a imagem atual aberta
let currentImageUrl = null;
let currentImageName = null;
let selectedColor = '#D4637B';

// Variável para armazenar a pasta selecionada
let selectedFolderHandle = null;

// Variáveis para controle de inatividade (5 minutos)
let inactivityTimeout = null;
const INACTIVITY_TIME = 5 * 60 * 1000; // 5 minutos em milissegundos

// Função para resetar o timer de inatividade
function resetInactivityTimer() {
    // Limpar o timeout anterior
    if (inactivityTimeout) {
        clearTimeout(inactivityTimeout);
    }
    
    // Definir novo timeout
    inactivityTimeout = setTimeout(() => {
        console.log('5 minutos de inatividade - redirecionando para Nova pasta');
        window.location.href = 'nova-pasta/index.html';
    }, INACTIVITY_TIME);
}

// Função para salvar pasta no IndexedDB
async function saveFolderHandle(folderHandle) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('GaleriaDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('folders')) {
                db.createObjectStore('folders', { keyPath: 'id' });
            }
        };

        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['folders'], 'readwrite');
            const store = transaction.objectStore('folders');
            store.put({ id: 'selectedFolder', handle: folderHandle });
            resolve();
        };

        request.onerror = () => reject(request.error);
    });
}

// Função para restaurar pasta do IndexedDB
async function restoreFolderHandle() {
    return new Promise((resolve) => {
        const request = indexedDB.open('GaleriaDB', 1);

        request.onsuccess = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('folders')) {
                resolve(null);
                return;
            }

            const transaction = db.transaction(['folders'], 'readonly');
            const store = transaction.objectStore('folders');
            const getRequest = store.get('selectedFolder');

            getRequest.onsuccess = () => {
                const result = getRequest.result;
                if (result && result.handle) {
                    resolve(result.handle);
                } else {
                    resolve(null);
                }
            };

            getRequest.onerror = () => resolve(null);
        };

        request.onerror = () => resolve(null);
    });
}

// Função para selecionar pasta
async function selectFolder() {
    try {
        selectedFolderHandle = await window.showDirectoryPicker();
        document.getElementById('folderStatus').textContent = '📁 Pasta selecionada: ' + selectedFolderHandle.name;
        
        // Salvar a pasta no IndexedDB
        await saveFolderHandle(selectedFolderHandle);
        
        await loadImagesFromFolder();
    } catch (error) {
        console.log('Erro ao selecionar pasta:', error);
        document.getElementById('folderStatus').textContent = '❌ Erro ao selecionar pasta';
    }
}

// Função para carregar pasta padrão ao iniciar
async function loadDefaultFolder() {
    try {
        const folderHandle = await restoreFolderHandle();
        
        if (folderHandle) {
            // Verificar permissão de acesso
            const permission = await folderHandle.queryPermission({ mode: 'read' });
            
            if (permission === 'granted') {
                selectedFolderHandle = folderHandle;
                document.getElementById('folderStatus').textContent = '📁 Pasta selecionada: ' + selectedFolderHandle.name;
                await loadImagesFromFolder();
            } else {
                // Solicitar permissão
                const newPermission = await folderHandle.requestPermission({ mode: 'read' });
                if (newPermission === 'granted') {
                    selectedFolderHandle = folderHandle;
                    document.getElementById('folderStatus').textContent = '📁 Pasta selecionada: ' + selectedFolderHandle.name;
                    await loadImagesFromFolder();
                }
            }
        }
    } catch (error) {
        console.log('Não foi possível restaurar pasta padrão:', error);
    }
}

// Função para carregar imagens da pasta
async function loadImagesFromFolder() {
    if (!selectedFolderHandle) {
        alert('Por favor, selecione uma pasta primeiro!');
        return;
    }

    try {
        userImages.length = 0; // Limpar array
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'];

        for await (const entry of selectedFolderHandle.values()) {
            if (entry.kind === 'file') {
                const fileName = entry.name.toLowerCase();
                const extension = fileName.split('.').pop();

                if (imageExtensions.includes(extension)) {
                    const file = await entry.getFile();
                    const reader = new FileReader();

                    await new Promise((resolve) => {
                        reader.onload = (e) => {
                            const imageObj = {
                                id: Date.now() + Math.random(),
                                src: e.target.result,
                                name: entry.name,
                                timestamp: new Date().toISOString()
                            };
                            userImages.push(imageObj);
                            resolve();
                        };
                        reader.readAsDataURL(file);
                    });
                }
            }
        }

        localStorage.setItem('userImages', JSON.stringify(userImages));
        renderGallery();
    } catch (error) {
        console.error('Erro ao carregar imagens:', error);
    }
}

// Função para salvar imagem na pasta
async function saveImageToFolder(base64Data, fileName) {
    if (!selectedFolderHandle) return;

    try {
        const fileHandle = await selectedFolderHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();

        // Converter base64 para blob
        const binaryString = atob(base64Data.split(',')[1]);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        await writable.write(bytes);
        await writable.close();

        console.log('Imagem salva na pasta:', fileName);
    } catch (error) {
        console.error('Erro ao salvar imagem na pasta:', error);
    }
}

// Função para carregar mensagem do arquivo .txt
async function loadMessageFromFile(imageName) {
    if (!selectedFolderHandle) {
        console.log('Nenhuma pasta selecionada para carregar mensagem');
        return '';
    }

    try {
        const txtFileName = imageName.replace(/\.[^/.]+$/, '') + '.txt';
        console.log('Tentando carregar:', txtFileName);
        
        const fileHandle = await selectedFolderHandle.getFileHandle(txtFileName);
        const file = await fileHandle.getFile();
        const text = await file.text();
        console.log('Mensagem carregada:', text.substring(0, 50) + '...');
        return text;
    } catch (error) {
        console.log('Arquivo de mensagem não encontrado ou erro ao ler:', error);
        return '';
    }
}

// Função para salvar mensagem em arquivo .txt
async function saveMessageToFile(imageName, message) {
    if (!selectedFolderHandle) {
        console.error('Erro: Pasta não selecionada');
        return;
    }

    try {
        const txtFileName = imageName.replace(/\.[^/.]+$/, '') + '.txt';
        console.log('Salvando mensagem em:', txtFileName);
        console.log('Tamanho da mensagem:', message.length);
        
        const fileHandle = await selectedFolderHandle.getFileHandle(txtFileName, { create: true });
        const writable = await fileHandle.createWritable();
        
        // Converter string para Uint8Array
        const encoder = new TextEncoder();
        const encodedMessage = encoder.encode(message);
        
        console.log('Bytes a escrever:', encodedMessage.length);
        await writable.write(encodedMessage);
        await writable.close();

        console.log('Mensagem salva com sucesso em:', txtFileName);
    } catch (error) {
        console.error('Erro ao salvar mensagem:', error);
        throw error;
    }
}

// Função para adicionar imagem ao localStorage e à pasta
async function addImageToStorage(base64Data, fileName) {
    const imageObj = {
        id: Date.now() + Math.random(),
        src: base64Data,
        name: fileName,
        timestamp: new Date().toISOString()
    };

    userImages.unshift(imageObj);
    localStorage.setItem('userImages', JSON.stringify(userImages));

    // Salvar na pasta selecionada se houver
    if (selectedFolderHandle) {
        await saveImageToFolder(base64Data, fileName);
    }

    return imageObj;
}

// Função para processar arquivos
function processFiles(files) {
    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = async (e) => {
                await addImageToStorage(e.target.result, file.name);
                renderGallery();
            };

            reader.readAsDataURL(file);
        }
    });
}

// Função para remover imagem
function removeImage(imageId) {
    const index = userImages.findIndex(img => img.id === imageId);
    if (index > -1) {
        userImages.splice(index, 1);
        localStorage.setItem('userImages', JSON.stringify(userImages));
        renderGallery();
    }
}

// Renderizar galeria
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    // Renderizar imagens do usuário primeiro
    userImages.forEach((userImg) => {
        const pinElement = document.createElement('div');
        pinElement.className = 'pin';
        pinElement.innerHTML = `
            <div style="position: relative;">
                <img src="${userImg.src}" alt="${userImg.name}" class="pin-image">
                <div class="pin-overlay"></div>
                <div class="favorite-badge" data-pin="user-${userImg.id}">
                    <span class="count">${favorites[`user-${userImg.id}`] || 1}</span>
                </div>
        `;

        // Evento de clique com botão esquerdo
        pinElement.addEventListener('mousedown', (e) => {
            if (e.button === 0) {
                e.preventDefault();
                toggleFavorite(`user-${userImg.id}`);
            }
        });

        // Evento de clique na imagem para abrir modal
        const pinImage = pinElement.querySelector('.pin-image');
        pinImage.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(userImg.src, userImg.name);
        });

        gallery.appendChild(pinElement);
    });
}

// Alternar favorito
function toggleFavorite(pinId) {
    // Incrementar ou inicializar favoritos
    if (!favorites[pinId]) {
        favorites[pinId] = 1;
    } else {
        favorites[pinId]++;
    }

    // Salvar no localStorage
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Atualizar UI com animação
    const badge = document.querySelector(`[data-pin="${pinId}"]`);
    if (badge) {
        const count = badge.querySelector('.count');
        count.textContent = favorites[pinId];

        // Remover classe ativa
        badge.classList.remove('active');

        // Forçar reflow para reiniciar animação
        void badge.offsetWidth;

        // Adicionar classe ativa
        badge.classList.add('active');

        // Remover após 2 segundos
        setTimeout(() => {
            badge.classList.remove('active');
        }, 2000);
    }
}

// Funções do Modal
function openModal(imageSrc, imageName) {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modalImage');
    const textEditorArea = document.getElementById('textEditorArea');
    const flipContainer = document.getElementById('flipContainer');

    currentImageUrl = imageSrc;
    currentImageName = imageName;

    console.log('Abrindo imagem:', imageName);
    console.log('Pasta selecionada:', selectedFolderHandle ? selectedFolderHandle.name : 'nenhuma');

    modalImage.src = imageSrc;
    flipContainer.classList.remove('flipped');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Carregar mensagem do arquivo .txt
    if (selectedFolderHandle) {
        loadMessageFromFile(imageName).then(message => {
            textEditorArea.innerHTML = message || '';
            updateToolbarState();
            updateViewContent(message);
            console.log('Conteúdo carregado no editor');
        }).catch(error => {
            console.error('Erro ao carregar mensagem:', error);
            textEditorArea.innerHTML = '';
            updateViewContent('');
        });
    } else {
        textEditorArea.innerHTML = '';
        updateViewContent('');
        console.log('Pasta não selecionada, editor vazio');
    }
}

function updateViewContent(htmlContent) {
    const viewContent = document.getElementById('viewContent');
    if (htmlContent && htmlContent.trim()) {
        viewContent.innerHTML = htmlContent;
    } else {
        viewContent.innerHTML = '<em style="color: #999;">Clique em ✏️ Editar para adicionar uma mensagem</em>';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Allow scrolling
    currentImageUrl = null;
    currentImageName = null;
}

function flipImage() {
    const flipContainer = document.getElementById('flipContainer');
    flipContainer.classList.toggle('flipped');
}

function toggleEditMode() {
    const backView = document.getElementById('backView');
    const backEdit = document.getElementById('backEdit');
    
    if (backView.style.display === 'none') {
        // Está em modo edição, voltar para visualização
        backView.style.display = 'flex';
        backEdit.style.display = 'none';
    } else {
        // Está em visualização, ir para edição
        backView.style.display = 'none';
        backEdit.style.display = 'flex';
    }
}

function updateColorPresets() {
    const presets = document.querySelectorAll('.color-preset');
    presets.forEach(preset => {
        const color = preset.getAttribute('data-color');
        if (color === selectedColor) {
            preset.classList.add('active');
        } else {
            preset.classList.remove('active');
        }
    });
}

function saveMessage() {
    const textEditorArea = document.getElementById('textEditorArea');
    const htmlContent = textEditorArea.innerHTML;
    const backSaveBtn = document.getElementById('backSaveBtn');

    if (currentImageName) {
        if (!selectedFolderHandle) {
            backSaveBtn.textContent = '❌ Pasta não selecionada!';
            console.error('Erro: Nenhuma pasta selecionada para salvar');
            setTimeout(() => {
                backSaveBtn.textContent = '💾 Salvar';
            }, 2000);
            return;
        }

        try {
            // Salvar o conteúdo HTML no arquivo .txt
            saveMessageToFile(currentImageName, htmlContent);
            
            // Atualizar a visualização
            updateViewContent(htmlContent);
            
            // Feedback visual
            const originalText = backSaveBtn.textContent;
            backSaveBtn.textContent = '✓ Salvo!';
            console.log('Mensagem salva com sucesso:', currentImageName);
            
            setTimeout(() => {
                backSaveBtn.textContent = originalText;
            }, 2000);
        } catch (error) {
            backSaveBtn.textContent = '❌ Erro ao salvar!';
            console.error('Erro ao salvar mensagem:', error);
            setTimeout(() => {
                backSaveBtn.textContent = '💾 Salvar';
            }, 2000);
        }
    } else {
        console.error('Erro: Nenhuma imagem aberta');
    }
}

function cancelEdit() {
    const flipContainer = document.getElementById('flipContainer');
    flipContainer.classList.remove('flipped');
}

// Funções de formatação
function formatText(command, value = null) {
    document.execCommand(command, false, value);
    updateToolbarState();
}

function updateToolbarState() {
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const underlineBtn = document.getElementById('underlineBtn');

    boldBtn.classList.toggle('active', document.queryCommandState('bold'));
    italicBtn.classList.toggle('active', document.queryCommandState('italic'));
    underlineBtn.classList.toggle('active', document.queryCommandState('underline'));
}

function clearFormatting() {
    const textEditorArea = document.getElementById('textEditorArea');
    const text = textEditorArea.innerText;
    textEditorArea.innerHTML = text;
    updateToolbarState();
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Carregar pasta padrão
    loadDefaultFolder();
    
    renderGallery();

    // Fechar modal ao clicar no botão X
    const modalClose = document.getElementById('modalClose');
    modalClose.addEventListener('click', closeModal);

    // Fechar modal ao clicar fora da imagem
    const modal = document.getElementById('modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Botão de flip
    const flipBtn = document.getElementById('flipBtn');
    flipBtn.addEventListener('click', flipImage);

    // Botões da toolbar
    const boldBtn = document.getElementById('boldBtn');
    const italicBtn = document.getElementById('italicBtn');
    const underlineBtn = document.getElementById('underlineBtn');
    const clearFormatBtn = document.getElementById('clearFormatBtn');

    boldBtn.addEventListener('click', () => formatText('bold'));
    italicBtn.addEventListener('click', () => formatText('italic'));
    underlineBtn.addEventListener('click', () => formatText('underline'));
    clearFormatBtn.addEventListener('click', clearFormatting);

    // Editor de texto
    const textEditorArea = document.getElementById('textEditorArea');
    textEditorArea.addEventListener('input', updateToolbarState);
    textEditorArea.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 'b' || e.key === 'B') {
                e.preventDefault();
                formatText('bold');
            } else if (e.key === 'i' || e.key === 'I') {
                e.preventDefault();
                formatText('italic');
            } else if (e.key === 'u' || e.key === 'U') {
                e.preventDefault();
                formatText('underline');
            }
        }
    });

    // Botão de salvar mensagem (no back)
    const backSaveBtn = document.getElementById('backSaveBtn');
    backSaveBtn.addEventListener('click', saveMessage);

    // Botão de cancelar
    const backCancelBtn = document.getElementById('backCancelBtn');
    backCancelBtn.addEventListener('click', () => {
        toggleEditMode();
    });

    // Botão de editar (na visualização)
    const viewEditBtn = document.getElementById('viewEditBtn');
    viewEditBtn.addEventListener('click', toggleEditMode);

    // Upload de imagens
    const uploadBtn = document.getElementById('uploadBtn');
    const uploadInput = document.getElementById('uploadInput');
    const dropZone = document.getElementById('dropZone');

    uploadBtn.addEventListener('click', () => {
        uploadInput.click();
    });

    uploadInput.addEventListener('change', (e) => {
        processFiles(e.target.files);
        uploadInput.value = ''; // Limpar input
    });

    // Botão de selecionar pasta
    const selectFolderBtn = document.getElementById('selectFolderBtn');
    selectFolderBtn.addEventListener('click', selectFolder);

    // Botão de recarregar
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.addEventListener('click', loadImagesFromFolder);

    // Drag and Drop
    document.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('active');
    });

    document.addEventListener('dragleave', (e) => {
        if (e.target === document || e.clientX === 0) {
            dropZone.classList.remove('active');
        }
    });

    document.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('active');
        processFiles(e.dataTransfer.files);
    });

    // Iniciar o timer de inatividade
    resetInactivityTimer();

    // Listeners para resetar o timer quando houver atividade
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('keypress', resetInactivityTimer);
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('scroll', resetInactivityTimer);
    document.addEventListener('touchstart', resetInactivityTimer);
});
