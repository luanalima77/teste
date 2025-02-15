function comecarJogo(){
    const botaoJogar = document.getElementById("startScreenMainContentStartButton");
    botaoJogar.addEventListener("click", () => {
        window.location.href = "src/scenes/game.html";
    })
}

comecarJogo();
