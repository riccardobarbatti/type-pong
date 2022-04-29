import { Game } from "./Game";

var game = new Game();
requestAnimationFrame(gameLoop);

function gameLoop(){
    game.update();
    game.draw();
     requestAnimationFrame(gameLoop);
}
