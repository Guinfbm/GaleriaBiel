// Login Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        try {
            const response = await fetch('users.json');
            const data = await response.json();
            
            const user = data.users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Login bem-sucedido
                loginError.textContent = '';
                // Redirecionar para a galeria
                window.location.href = 'index.html';
            } else {
                // Login falhou
                loginError.textContent = 'Usuário ou senha incorretos!';
                // Limpar campos
                document.getElementById('password').value = '';
            }
        } catch (error) {
            loginError.textContent = 'Erro ao validar. Tente novamente!';
            console.error('Error loading users:', error);
        }
    });
});
