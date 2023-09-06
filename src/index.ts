   /*********************************/
  /** Author: Riccardo Barbatti  ***/
 /** Type Pong - ver 1.1.0      ***/
/*********************************/

import { Game } from "./Game";

var game = new Game();
requestAnimationFrame(gameLoop);

function gameLoop(){
    game.update();
    game.draw();
     requestAnimationFrame(gameLoop);
}
