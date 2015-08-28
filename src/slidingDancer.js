
function SlidingDancer(top, left, timeBetweenSteps){
  this._blinkyStep = BlinkyDancer.prototype.step;
  BlinkyDancer.apply(this, arguments);
  this.$node.addClass('bee');
  this.$node.prepend('<img src="sprites/Bee_Sprites_2.png">');
  // this.$node.css('position', 'absolute');
  this.direction = Math.floor(Math.random()*2) ? -25 : 25;
  this.following = null;
}

SlidingDancer.prototype = Object.create(BlinkyDancer.prototype);
SlidingDancer.prototype.constructor = SlidingDancer;
SlidingDancer.prototype.step = function() {
  const change = 200;
  var randomTime = Math.floor(Math.random() * 1000);  
  this._blinkyStep();

  if (!this.stopMoving) {
    window.dancers.forEach(function(dnc){
      if (dnc instanceof FarmerDancer) {
        if (this.checkCollision(dnc, 200) && !this.following) {
          console.log(this.$node[0], 'following: ', dnc.$node[0]);
          this.following = dnc; 
        }
      }
    }, this);

    if(this.following) {
      var leftBound, topBound, rightBound, bottomBound;
      leftBound = Math.min(this.left, this.following.left);
      rightBound = Math.max(this.left, this.following.left);
      topBound = Math.min(this.top, this.following.top);
      bottomBound = Math.max(this.top, this.following.top);
      this.move(change, change, leftBound, topBound, rightBound, bottomBound, randomTime);
    } 
    else {
      this.move(change, change, 0, 0, window.innerWidth, window.innerHeight, randomTime);
    }
  }
};

