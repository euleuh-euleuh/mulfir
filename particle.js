class Particle {
  constructor(x, y, hu, firework, subexplosion=false) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu;
    this.acc = createVector(0, -7);
    this.subexplosion = subexplosion;

    if (this.firework) {
      this.vel = createVector(0, random(-12, -5));
    } else {
      this.vel = createVector(random(-2, 2), random(-2, 2));
      this.vel.mult(random(4, 12));
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  updatePar() {
    if (!this.firework) {
      this.vel.mult(random(0.85, 0.99));
      this.lifespan -= random(-3, 8);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  donePar() {
    return this.lifespan < 0;
  }
  showPar() {
    colorMode(HSB);
    if (!this.firework) {
      strokeWeight(2);
      stroke(this.hu, 255, 255, this.lifespan);
    } else {
      strokeWeight(5);
      stroke(this.hu, 255, 255);
    }
    point(this.pos.x, this.pos.y);
  }
}
