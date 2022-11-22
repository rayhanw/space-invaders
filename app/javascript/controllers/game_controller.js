import { Controller } from "@hotwired/stimulus";
import { BulletController } from "../game/bullet_controller";
import { EnemyController } from "../game/enemy_controller";
import { Player } from "../game/player";
// Connects to data-controller="game"
export default class extends Controller {
  static targets = ["canvas"];
  static values = {
    enemies: Array,
    player: String,
    space: String,
    shoot: String,
    enemyDeath: String,
  };

  connect() {
    this.isGameOver = false;
    this.didWin = false;
    this.#setupCanvas();
    this.#setupContext();
    this.#setupBackground();
    this.#setupCharacters();

    this.interval = setInterval(() => {
      this.#checkGameOver();
      this.#setupBackground();
      this.#displayGameOver();
      this.#draw();
    }, 1000 / 60);
  }

  disconnect() {
    clearInterval(this.interval);
  }

  #draw() {
    this.playerBulletController.draw(this.ctx);
    this.enemyBulletController.draw(this.ctx);
    this.enemyController.draw(this.ctx);
    this.player.draw(this.ctx);
  }

  #setupCharacters() {
    this.playerBulletController = new BulletController(
      this.canvasTarget,
      10,
      "red",
      true,
      this.shootValue
    );
    this.enemyBulletController = new BulletController(
      this.canvasTarget,
      4,
      "white",
      this.shootValue
    );
    this.enemyController = new EnemyController(
      this.canvasTarget,
      this.enemyBulletController,
      this.playerBulletController,
      this.enemyDeathValue,
      this.enemiesValue
    );
    this.player = new Player(
      this.canvasTarget,
      3,
      this.playerBulletController,
      this.playerValue
    );
  }

  #setupContext() {
    this.ctx = this.canvasTarget.getContext("2d");
  }

  #setupBackground() {
    this.background = new Image();
    this.background.src = this.spaceValue;
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvasTarget.width,
      this.canvasTarget.height
    );
  }

  #setupCanvas() {
    this.canvasTarget.height = 600;
    this.canvasTarget.width = 600;
  }

  #checkGameOver() {
    if (this.isGameOver) {
      return;
    }

    if (
      this.enemyBulletController.collideWith(this.player) ||
      this.enemyController.collideWith(this.player)
    ) {
      this.isGameOver = true;
    }

    if (this.enemyController.enemyRows.length === 0) {
      this.didWin = true;
      this.isGameOver = true;
    }
  }

  #displayGameOver() {
    if (this.isGameOver) {
      clearInterval(this.interval);
      this.#setupBackground();
      const text = this.didWin ? "You won" : "Game Over";
      const textOffset = this.didWin ? 3.5 : 5;

      this.ctx.fillStyle = "white";
      this.ctx.font = "70px Arial";
      this.ctx.fillText(
        text,
        this.canvasTarget.width / textOffset,
        this.canvasTarget.height / 2
      );
    }
  }
}
