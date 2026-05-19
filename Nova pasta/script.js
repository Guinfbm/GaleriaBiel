function atualizarRelogio() {
    var relogio = document.querySelector('.relogio');
    var data = new Date();

    var data = corrigirFormato(data.getHours()) + ':' + corrigirFormato(data.getMinutes()) + ':' + corrigirFormato(data.getSeconds());

    relogio.innerHTML = data;

   
}

function corrigirFormato(numero) {
    return numero < 10 ? '0' + numero : numero;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

const audio = new Audio('tick.mp3');
setInterval(() => {
    audio.play();
}, 1000);