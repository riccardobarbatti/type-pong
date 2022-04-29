import {Entity} from "./Entity";
import {Ball} from "./Ball";

export class ComputerPaddle extends Entity{

    private speed:number = 5;

    constructor(w:number,h:number,x:number,y:number){
        super(w,h,x,y);
    }

    update(ball:Ball, canvas) {


        //chase ball - Simple AI
        if (this.x  < ball.x) {
            this.xVel = 1;
            if(this.x + this.width >= canvas.width -20){
                this.xVel = 0;
            }
        } else {
            this.xVel = -1;
            if(this.x < 20){
                this.xVel = 0;
            }
        }



        this.x += this.xVel * this.speed;

    }

}
