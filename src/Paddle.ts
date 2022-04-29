import {Entity} from "./Entity";
import {Game} from "./Game";
import {KeyBindings} from "./Controls";

export class Paddle extends Entity{

    //Paddle Move
    private speed:number = 10;

    constructor(w:number,h:number,x:number,y:number){
        super(w,h,x,y);
    }

    //left and right key controls
    update(canvas){
        if( Game.keysPressed[KeyBindings.LEFT] ){
            this.xVel = -1;
            if(this.x <= 20){
                this.xVel = 0
            }
        }else if(Game.keysPressed[KeyBindings.RIGHT]){
            this.xVel = 1;
            if(this.x + this.width >= canvas.width - 20){
                this.xVel = 0;
            }
        }else{
            this.xVel = 0;
        }
        //paddle move
        this.x += this.xVel * this.speed;

    }
}
