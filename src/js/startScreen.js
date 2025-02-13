function comecarJogo(){
    const botaoJogar = document.getElementById("startScreenMainContentStartButton");
    botaoJogar.addEventListener("click", () => {
        window.location.href = "src/game.html";
    })
}

comecarJogo();