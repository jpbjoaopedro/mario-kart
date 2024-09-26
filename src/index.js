const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};


const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
};

async function rollDice() {
    dice = Math.floor(Math.random() * 6) + 1;
    return dice;
}

async function playRaceEngine(character1, character2) {
    for (let i=0; i<5; i++) {

    }
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`
    )

    await playRaceEngine(player1, player2)
})()