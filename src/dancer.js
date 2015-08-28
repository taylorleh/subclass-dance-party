function Dancer(top, left, timeBetweenSteps) {
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  // debugger;
  this.top = top;
  this.left = left;
  this.setPosition(top, left);  
  this.step();
}
Dancer.prototype.stopMoving = false;
Dancer.prototype.lineup = function(ind, amt) {
  var horizAlign = window.innerHeight / 2;
  var vertAlign = ((window.innerWidth) / (amt + 1)) * (ind + 1);

  if (this.stopMoving) {
    this.$node.animate({
      left:vertAlign+'px',
      top:horizAlign+'px'
    },2500);
  }
  else { 
    this.$node.animate({
      left: this.left+'px',
      top: this.top+'px'
    }, 2500);
  }
};
Dancer.prototype.step = function() {

  setTimeout(this.step.bind(this), this.timeBetweenSteps);
  
}
Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
}

Dancer.prototype.move = function(leftChange, topChange, leftBound, topBound, rightBound, bottomBound, duration) {
  var leftChange = Math.random()*leftChange-(.5*leftChange);
  var topChange = Math.random()*topChange-(.5*topChange);

  var newLeft = (this.left+leftChange >= leftBound && this.left + leftChange <= rightBound) ? this.left + leftChange : this.left;
  var newTop = (this.top+topChange >= topBound && this.top + topChange <= bottomBound) ? this.top + topChange : this.top;

  this.$node.animate({
    left: newLeft+'px',
    top: newTop+'px'
  },{
    duration:duration,
    done:function(){
      this.left = newLeft;
      this.top = newTop;
      this.step();
    }.bind(this)

  });
}

Dancer.prototype.hasAnyCollisions = function(dancerType, collisionDistance) {
  for (var i = 0; i < window.dancers.length; i++) {
    if (window.dancers[i] instanceof dancerType && this.checkCollision(window.dancers[i], collisionDistance)) { return true; }
  }
  return false;
}

Dancer.prototype.checkCollision = function(Dancer, collisionDistance) {
  var leftDist = this.left - Dancer.left;
  var topDist = this.top - Dancer.top;

  var distance = Math.sqrt(Math.pow(leftDist,2)+Math.pow(topDist,2));

  return distance < collisionDistance;
}

