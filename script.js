let players = {};
let currentPlayer = "";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

document.getElementById('startGame').addEventListener('click', startGame)

function startGame() {
    //Coloca os valores dos nomes dos jogadores com as chaves X e O
    players["X"] = document.getElementById("player1").value || "Jogador 1";
    players["O"] = document.getElementById("player2").value || "Jogador 2";
    //Jogador atual é o da chave X
    currentPlayer = "X";
    gameActive = true;

    //Faz o input dos jogadores sumir
    document.getElementById("playerInput").classList.add("hidden");
    //Faz os outros elementos aparecerem
    document.getElementById("board").classList.remove("hidden");
    document.getElementById("turnInfo").classList.remove("hidden");
    document.getElementById("restart").classList.remove("hidden");
    //Chama a função que mostra o jogador da vez
    updateTurnInfo();

    //Guarda o espaço reservado para o tabuleiro na variável
    const boardElement = document.getElementById("board");
    //boardElement.innerHTML = ""; Este código apaga todos o html existente dentro do elemento
    //Cria 9 divs com classe cell e data.index = i (0 a 9)
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        //Quando uma div é clicada chama a função
        cell.addEventListener("click", handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const index = event.target.dataset.index;
    if (!gameActive || board[index] !== "") return;
    
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    event.target.dataset.value = currentPlayer; // Adiciona o data-value para o CSS aplicar as cores
    
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateTurnInfo();
}


/*function handleCellClick(event) {
    //Variável contém o índice da célula da div clicada
    const index = event.target.dataset.index;
    //Se o game está inativo ou a célula clicada está preenchida a função encerra
    if (!gameActive || board[index] !== "") return;
    //Marca a célula clicada com o simbolo do jogador atual
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    //Checa se há vencedor
    checkWinner();
    //Troca o símbolo do jogador
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    //Mostra o jogador da vez
    updateTurnInfo();
}*/

function checkWinner() {
    //Funciona como o forEach, mas permite o uso do return
    for (const pattern of winPatterns) {
        //Utiliza desestruturação para atribuir variáveis aos valores do tabuleiro
        const [a, b, c] = pattern;
        //Verifica se as três divs são iguais
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            //Desativa o jogo
            gameActive = false;
            //Informa o vencedor
            document.getElementById("result").innerText = `${players[board[a]]} venceu!`;
            //Faz o resultado aparecer
            document.getElementById("result").classList.remove("hidden");
            highlightWinningCells(pattern);
            return;
        }
    }
    //Se o tabuleiro não tem espaço vazio
    if (!board.includes("")) {
        //Desativa o jogo
        gameActive = false;
        //Coloca "Empate" no resultado e o torna visível
        document.getElementById("result").innerText = "Empate!";
        document.getElementById("result").classList.remove("hidden");
    }
}

function highlightWinningCells(pattern) {
    //Coloca todas as células em uma nodeList
    const cells = document.querySelectorAll(".cell");
    //Utiliza o forEach para pegar cada elemento do array patern e iluminar a célula correspondente
    pattern.forEach(index => cells[index].classList.add("highlight"));
}

function updateTurnInfo() {
    //Se o jogo estiver ativo, mostra o jogador da vez
    if (gameActive) {
        document.getElementById("turnInfo").innerText = `Vez de: ${players[currentPlayer]}`;
    }
}

function resetGame() {
    //Remove todos os valores de board
    board = ["", "", "", "", "", "", "", "", ""];
    //Ativa o jogo
    gameActive = true;
    //Esconde o resultado
    document.getElementById("result").classList.add("hidden");
    //Remove os símbolos do tabuleiro e a classe de iluminar as células
    document.querySelectorAll(".cell").forEach(cell => {
        cell.innerText = "";
        cell.classList.remove("highlight");
    });
    currentPlayer = "X";
    updateTurnInfo();
}