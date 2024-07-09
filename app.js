let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1;
function exibirTextoNaTela(tag, mensagem){
    let campo = document.querySelector(tag)
    campo.innerHTML = mensagem;
    responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate:1.2});
};
function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', 'Escolha um Numero entre 1 e 10');
}
exibirMensagemInicial();

function verificarChute(){
    let chute = document.querySelector('input').value;
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1','Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o numero secreto com ${tentativas} ${palavraTentativa}`;
        exibirTextoNaTela('p',mensagemTentativas)
        document.getElementById('reiniciar').removeAttribute('disabled');
        desabilitarChute();

    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p','O Número Secreto é Menor')
        }else{
            exibirTextoNaTela('p','O Número Secreto é Maior')
        }
    }
    tentativas++;
    limparCampo();
}
function desabilitarChute(){
    let botaoChutar = document.getElementById('chutar');
    botaoChutar.style.backgroundColor='grey';
    botaoChutar.setAttribute('disabled','true');
}
function habilitarChute(){
    let btnChutar = document.getElementById('chutar');
    btnChutar.removeAttribute('disabled');
    btnChutar.style.backgroundColor='#1875E8';
}

function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    console.log(quantidadeDeElementosNaLista);

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = []
    }
    if(listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
    habilitarChute();
}