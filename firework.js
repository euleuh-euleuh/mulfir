class Firework {
  constructor() {
    this.hu = random(255);
    this.firework = new Particle(random(width), height, this.hu, true);
    this.exploded = false;
    this.particles = [];
  }

  updateFir() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.updatePar();
      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explodeFir();
      }
    }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].updatePar();
      if (this.particles[i].donePar()) {
        if (this.particles[i].subexplosion) {
          this.subExplode(this.particles[i]);
        }

        this.particles.splice(i, 1);
      }
    }
  }
  explodeFir() {
    for (let i = 0; i < 150; i++) {
      let subexplosion = random(1) < 0.05;
      let p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false,
        subexplosion,
      );
      this.particles.push(p);
    }
  }

  subExplode(particle) {
    for (let i = 0; i < 50; i++) {
      let p = new Particle(particle.pos.x, particle.pos.y, this.hu, false);
      this.particles.push(p);
    }
  }

  showFir() {
    if (!this.exploded) {
      this.firework.showPar();
    }
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].showPar();
    }
  }

  doneFir() {
    return this.exploded && this.particles.length === 0;
  }
}
