const engine = {
  "cores": ['green', 'purple', 'pink', 'red', 'yellow', 'orange', 'grey', 'black'],
  "hexadecimais": {
    "green": '#02EF00',
    "purple": '#790093',
    "pink": '#F02A67',
    "red": '#E90808',
    "yellow": '#E7D703',
    "orange": '#F16529',
    "grey": '#EBEBEB',
    "black": '#141414',

  },
  "moedas": 0
}

const audioMoeda = new Audio("assets/audio/moeda.mp3")
const audioErrou = new Audio("assets/audio/errou.mp3")


function sortearCor() {
  let indexCorSorteada = Math.floor(Math.random() * engine.cores.length)
  let legendaCorDaCaixa = document.getElementById('cor-da-caixa')
  let nomeCorSorteada = engine.cores[indexCorSorteada]

  legendaCorDaCaixa.innerText = nomeCorSorteada.toUpperCase()

  return engine.hexadecimais[nomeCorSorteada]
}

function aplicarCorNaCaixa(nomeDaCor) {
  let caixaDasCores = document.getElementById('cor-atual')

  caixaDasCores.style.backgroundColor = nomeDaCor
  caixaDasCores.style.backgroundImage = "url(assets/img/caixa-fechada.png)"
  caixaDasCores.style.backgroundSize = "contain"

}

function atualizaPontuacao(valor) {
  let pontuacao = document.getElementById('pontuacao-atual')

  engine.moedas += valor
  if (valor > 0) {
    audioMoeda.play()
  } else {
    audioErrou.play()
  }

  pontuacao.innerText = engine.moedas
}

aplicarCorNaCaixa(sortearCor())

/** API DE RECONHECIMENTO DE VOZ */

let btnGravador = document.getElementById('btn-responder')
let transcricaoAudio = ''
let respostaCorreta = ''

if (window.SpeechRecognition || window.webkitSpeechRecognition) {

  let SpeechAPI = window.SpeechRecognition || window.webkitSpeechRecognition
  var gravador = new SpeechAPI()


  gravador.continuos = false;
  gravador.lang = "eu-US"

  gravador.onstart = function () {
    btnGravador.innerText = "Estou ouvindo"

    btnGravador.style.backgroundColor = "white"
    btnGravador.style.color = "black"
  }

  gravador.onend = function () {
    btnGravador.innerText = "Responder"

    btnGravador.style.backgroundColor = "transparent"
    btnGravador.style.color = "white"
  }

  gravador.onresult = function (event) {
    transcricaoAudio = event.results[0][0].transcript.toUpperCase();
    respostaCorreta = document.getElementById('cor-na-caixa').innerText.toUpperCase();

    if (transcricaoAudio === respostaCorreta) {
      atualizaPontuacao(1);
    } else {
      atualizaPontuacao(-1);
    }

    aplicarCorNaCaixa(sortearCor());
  }

} else {
  alert('Não tem suporte')
}


btnGravador.addEventListener('click', function (e) {
  gravador.start()
})
