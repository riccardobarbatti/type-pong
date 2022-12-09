   /*********************************/
  /** Author: Riccardo Barbatti  ***/
 /** Type Pong - ver 0.1.0      ***/
/*********************************/

import { Game } from "./Game";

var game = new Game();
requestAnimationFrame(gameLoop);

function gameLoop(){
    game.update();
    game.draw();
     requestAnimationFrame(gameLoop);
}
