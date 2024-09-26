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

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
            result = 'RETA';
            break
        case random < 0.66:
            result = 'CURVA';
            break
        default:
            result = 'CONFRONTO';
    }

    return result;
}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        console.log(
            `🏁 Rodada ${round}`
        );

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`BLOCO: ${block}`);

        // rolar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block == "RETA") {
            totalTestSkill1 = character1.VELOCIDADE + diceResult1;
            totalTestSkill2 = character2.VELOCIDADE + diceResult2;

            await logRollResult(
                character1.NOME, 
                "velocidade",
                diceResult1,
                character1.VELOCIDADE
            );
            await logRollResult(
                character2.NOME, 
                "velocidade",
                diceResult2,
                character2.VELOCIDADE
            );
            
        };

        if(block == "CURVA") {
            totalTestSkill1 = character1.MANOBRABILIDADE + diceResult1;
            totalTestSkill2 = character2.MANOBRABILIDADE + diceResult2;

            await logRollResult(
                character1.NOME, 
                "manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            );
            await logRollResult(
                character2.NOME, 
                "manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            );
        };

        if(block == "CONFRONTO") {
            powerResult1 = character1.PODER + diceResult1;
            powerResult2 = character2.PODER + diceResult2;



        };
    };
};

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
};

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...`
    )

    await playRaceEngine(player1, player2)
})()