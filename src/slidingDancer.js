
function SlidingDancer(top, left, timeBetweenSteps){
  this._blinkyStep = BlinkyDancer.prototype.step;
  BlinkyDancer.apply(this, arguments);
  this.$node.addClass('bee');
  this.$node.prepend('<img src="sprites/Bee_Sprites_2.png">');
  // this.$node.css('position', 'absolute');
  this.direction = Math.floor(Math.random()*2) ? -25 : 25;
}

SlidingDancer.prototype = Object.create(BlinkyDancer.prototype);
SlidingDancer.prototype.constructor = SlidingDancer;
SlidingDancer.prototype.step = function() {
  // We're supposed to call old step
  this._blinkyStep();

  // And then call blindancer.node.toggle
  //this.setPosition(this.top, this.left-5);
  if (!this.stopMoving) {
  	var bodWidth = window.innerWidth;
	if (this.left < 40) {
		this.direction = 25;
	}
	// else if we're within 40 of the right border
	else if (window.innerWidth-this.left < 40) {
		this.direction = -25;
	}
	this.left += this.direction;

	this.setPosition(this.top, this.left);
  }
};

