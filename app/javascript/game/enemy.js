class Enemy {
  constructor(x, y, image) {
    this.x = x;
    this.y = y;

    this.width = 44;
    this.height = 32;

    this.image = new Image();
    this.image.src = image;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  move(xVelocity, yVelocity) {
    this.x += xVelocity;
    this.y += yVelocity;
  }

  collideWith(sprite) {
    // Bounding box Collision Detection Technique
    if (
      this.x + this.width > sprite.x &&
      this.x < sprite.x + sprite.width &&
      this.y + this.height > sprite.y &&
      this.y < sprite.y + sprite.height
    ) {
      return true;
    } else {
      return false;
    }
  }
}

export { Enemy };
