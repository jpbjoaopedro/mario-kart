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
    let roundSeparate = '\n----------------------------------------------------------------';

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

            character1.PONTOS += totalTestSkill1 > totalTestSkill2 ? 1 : 0;
            character2.PONTOS += totalTestSkill1 < totalTestSkill2 ? 1 : 0;   
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

            character1.PONTOS += totalTestSkill1 > totalTestSkill2 ? 1 : 0;
            character2.PONTOS += totalTestSkill1 < totalTestSkill2 ? 1 : 0;
        };

        if(block == 'CONFRONTO') {
            // resultado dos dados
            powerResult1 = character1.PODER + diceResult1;
            powerResult2 = character2.PODER + diceResult2;

            console.log(`${character1.NOME} confrontou com ${character2.NOME} `);
            
            // Imprimindo o resultado dos dados
            await logRollResult(
                character1.NOME, 
                "poder",
                diceResult1,
                character1.PODER
            );
            await logRollResult(
                character2.NOME, 
                "poder",
                diceResult2,
                character2.PODER
            );

            // verificando o vencedor do confronto
            if (powerResult1 > powerResult2) {
                console.log(`${character1.NOME} venceu o confroto! ${character1.NOME} perdeu 1 ponto 🐢`);
                
                // retirando pontos do perdedor da rodada
                character2.PONTOS -= character2.PONTOS == 0 ? 0 : 1;
                
            }else if (powerResult1 < powerResult2) {
                console.log(`${character2.NOME} venceu o confroto! ${character1.NOME} perdeu 1 ponto 🐢`);

                // retirando pontos do perdedor da rodada
                character1.PONTOS -= character1.PONTOS == 0 ? 0 : 1;
            }else {
                console.log('EMPATE 😱 Ninguém perdeu ponto!')
            };

        };
        console.log(roundSeparate)
    };
};

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou o dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`);
};

async function declareWinner(character1, character2) {
    console.log("Resultado final: ")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`${character1.NOME} foi o vencedor da corrida! 🏆`)
    } else if (character1.PONTOS < character2.PONTOS) {
        console.log(`${character2.NOME} foi o vencedor da corrida! 🏆`)
    } else {
        console.log(`Os jogadores ${character1.NOME} e ${character2.NOME} empataram!`)
    }
};

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})()