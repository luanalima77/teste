
var config = {
    type: Phaser.AUTO,
    width: 393,
    height: 852,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
        //setar variaveis universais que serão uteis pro código
var game = new Phaser.Game(config);
var pombo;
var parado = false;
var velocidadeX = 5;
var velocidadeY = 4; 
var audio = new Audio('/assets/audios/pru.mp3');


        //função que "pré-carrega" os arquivos na página
function preload() {

    this.load.image('bg', '/assets/background.jpg');
    this.load.spritesheet('pombo', '/assets/pombo.png', { frameWidth: 64, frameHeight:64 }); 
    this.load.image('splash', '/assets/splash.png');
    this.load.audio('pru', '/assets/audios/pru.mp3');
    this.load.image('PauseBtn', '/assets/botões/pause.png')

}
        //função que cria as coisas na página
function create() {
    this.add.image(285, 425, 'bg').setScale(1.0);
    somPombo = this.sound.add('pru');

    // criar animação do pombo voando
    this.anims.create({
        key: 'direita',
        frames: this.anims.generateFrameNumbers('pombo', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    
    // função que adiciona um botão de pause na tela
    PauseBtn = this.add.image(40, 50, 'PauseBtn')
    PauseBtn.setInteractive()
    PauseBtn.on('pointerdown', () => {
        window.location.href = "http://127.0.0.1:5501/index.html";
    })

    spawnPombo.call(this); // Agora o pombo já pode usar a animação
}

    // função que spawna o pombo em um lugar aleatório da tela
function spawnPombo() {
    let posX = Phaser.Math.Between(100, 500); 
    let posY = Phaser.Math.Between(0, 700); 

    pombo = this.add.sprite(posX, posY, 'pombo').setScale(1.5);
    pombo.setInteractive();
    pombo.ida = true; // Inicializa a direção
    pombo.sobe = true;

    // chama a animação do pombo
    pombo.play('direita');

    // faz o pombo ser clicável
    this.input.on('pointerdown', (pointer) => {
        if (pombo.getBounds().contains(pointer.x, pointer.y)) {
    
            // Cria efeito de fade-out
            this.tweens.add({
                targets: pombo,
                alpha: 0,
                duration: 300,
                ease: 'Linear',
                onComplete: () => {
                    pombo.destroy();
                    somPombo.play({volume: 0.5});  //toca o som de pombo quando o pombo é clicado
                    this.time.delayedCall(1000, () => {
                        somPombo.stop(); //para o som do pombo após 1000ms(1s)
                    });
                    spawnPombo.call(this); // Cria um novo pombo após sumir
                }
    
            });


            let splash = this.add.image(pombo.x, pombo.y, 'splash').setScale(0.3); //adiciona o splash de tinta na tela
            splash.alpha = 0; 

            // Efeito de fade-in para o splash
            this.tweens.add({
                targets: splash,
                alpha: 1,
                duration: 300,
                ease: 'Linear',
                onComplete: () => {
                    this.tweens.add({
                        targets: splash,
                        alpha: 0.0,
                        duration: 500,
                        ease: 'Linear'
                    });
                }
            });
        }
    });
}

function update() { 
    if (!parado){ // Só move o rato se ele não estiver parado
        // Movimento no eixo X
        if (pombo.x >= 350){
            pombo.setFlip(false,false);
            pombo.ida = true;
        }
        if (pombo.x > 40 && pombo.ida === true){
            pombo.x -= velocidadeX;
            pombo.angle = 0;
        }
        if (pombo.x <= 40){
            pombo.setFlip(true,false);
            pombo.ida = false;
        }
        if (pombo.x < 350 && pombo.ida === false){
            pombo.x += velocidadeX;
            pombo.angle = 0;
        }

        // Movimento no eixo Y
        if (pombo.y >= 810){
            pombo.setFlip(false,false);
            pombo.sobe = true;
        }
        if (pombo.y > 40 && pombo.sobe === true){
            pombo.y -= velocidadeY;
            pombo.angle = 0;
        }
        if (pombo.y <= 40){
            pombo.setFlip(true,false);
            pombo.sobe = false;
        }
        if (pombo.y < 810 && pombo.sobe === false){
            pombo.y += velocidadeY;
            pombo.angle = 0;
        }
    }
}
