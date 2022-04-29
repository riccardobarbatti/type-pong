import {Paddle} from "./Paddle";
import {ComputerPaddle} from "./ComputerPaddle";
import {Ball} from "./Ball";

export class Game {
    private gameCanvas;
    private gameContext;
    public static keysPressed: boolean[] = [];
    public static playerScore: number = 0;
    public static computerScore: number = 0;
    private player1: Paddle;
    private computerPlayer: ComputerPaddle;
    private ball: Ball;

    constructor(){
        this.gameCanvas = document.getElementById("game-canvas");
        this.gameContext = this.gameCanvas.getContext("2d");
        this.gameContext.font = "30px Orbitron";

        window.addEventListener("keydown",function(e){
            Game.keysPressed[e.which] = true;
        });

        window.addEventListener("keyup",function(e){
            Game.keysPressed[e.which] = false;
        });

        //paddle set size and wall offset
        var paddleWidth:number = 50, paddleHeight:number = 10, ballSize:number = 10, wallOffset:number = 50;

        //payer
        this.player1 = new Paddle(paddleWidth, paddleHeight, this.gameCanvas.width / 2 - paddleWidth / 2,this.gameCanvas.height  - paddleHeight - 20);

        //computer player
        this.computerPlayer = new ComputerPaddle(paddleWidth,paddleHeight, this.gameCanvas.width / 2 - paddleWidth / 2, this.gameCanvas.height / 2 - paddleHeight - 320);

        this.ball = new Ball(ballSize,ballSize,this.gameCanvas.width / 2 - ballSize / 2, this.gameCanvas.height / 2 - ballSize / 2);

        console.log("Pong init")

    }
    drawBoardDetails(){

        //draw court outline
        this.gameContext.strokeStyle = "#fff";
        this.gameContext.lineWidth = 5;
        this.gameContext.strokeRect(10,10,this.gameCanvas.width - 20 ,this.gameCanvas.height - 20);

        //draw center lines - X -----
        for (var i = 0; i + 30 < this.gameCanvas.height; i += 29) {
            this.gameContext.fillStyle = "#fff";
            this.gameContext.fillRect( i + 10, this.gameCanvas.height / 2 - 10, 20, 5);
        }

        //draw scores
        this.gameContext.fillText(Game.playerScore, 20, this.gameCanvas.height / 2 + 40);
        this.gameContext.fillText(Game.computerScore, 20, this.gameCanvas.height / 2 - 20);

    }
    update(){
        this.player1.update(this.gameCanvas);
        this.computerPlayer.update(this.ball,this.gameCanvas);
        this.ball.update(this.player1,this.computerPlayer,this.gameCanvas);
    }
    draw(){
        this.gameContext.fillStyle = "#000";
        this.gameContext.fillRect(0,0,this.gameCanvas.width,this.gameCanvas.height);

        this.drawBoardDetails();
        this.player1.draw(this.gameContext);
        this.computerPlayer.draw(this.gameContext);
        this.ball.draw(this.gameContext);
    }


}










