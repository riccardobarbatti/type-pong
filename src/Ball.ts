import {Entity} from "./Entity";
import {Paddle} from "./Paddle";
import {ComputerPaddle} from "./ComputerPaddle";
import {Game} from "./Game";

export class Ball extends Entity{

    private speed:number = 5;
    private paddleDiff: number = 30;

    constructor(w:number,h:number,x:number,y:number){
        super(w,h,x,y);
        //made random direction ball
        var randomDirection = Math.floor(Math.random() * 2) + 1;
        if(randomDirection % 2){
            this.xVel = 1;
        }else{
            this.xVel = -1;
        }
       this.yVel = 1;
    }
    update(player:Paddle,computer:ComputerPaddle,canvas){

        //bounce bal limit left | right border
        //-----------------------------------------
        //check left canvas bounds
        if(this.x <= 0){
            this.xVel = 1;
        }

        //check right canvas bounds
        if(this.x + this.width >= canvas.width){
            this.xVel = -1;
        }

        //CHECK POINT
        //-----------------------------------------
        //check top canvas bounds | POINT playerScore
        if(this.y <= 0){
            //reset ball middle
            this.y = canvas.height / 2 - this.height / 2;
            Game.playerScore += 1;

        }
        //check bottom canvas bounds | POINT computerScore
        if(this.y + this.height >= canvas.height){
            //reset ball middle
            this.y = canvas.height / 2 - this.height / 2;
            Game.computerScore += 1;
        }

        //_________________________
        //bottom check - computer
        if (this.y >= canvas.height - this.paddleDiff) {
            if (this.x >= player.x && this.x + this.width <= player.x + player.width) {
                //change direction
                this.yVel = -1;

            }
        }
       // top check - player
        if (this.y <= this.paddleDiff) {
            if (this.x >= computer.x && this.x +this.width <= computer.x +computer.width) {
                //change direction
                this.yVel = +1;
        }
    }

        //set move ball
        this.x += this.xVel * this.speed;
        this.y += this.yVel * this.speed;
    }
}
