function Dancer(top, left, timeBetweenSteps) {
  this.$node = $('<span class="dancer"></span>');
  this.timeBetweenSteps = timeBetweenSteps;
  this.step();
  this.setPosition(top, left);
  this.top = top;
  this.left = left;
}
Dancer.prototype.stopMoving = false;
// on button click for lineup, set to true
Dancer.prototype.lineup = function(ind, amt) {
  // var increment = (window.innerWidth) / (amt + 1);
  //this.left = (window.innerWidth / (amt + 1)) * (ind + 1);
  var horizAlign = window.innerHeight / 2;
  var vertAlign = ((window.innerWidth) / (amt + 1)) * (ind + 1);

  if (this.stopMoving) {
    // this.setPosition(window.innerHeight / 2, increment * (ind+1));
    this.$node.animate({
      left:vertAlign+'px',
      top:horizAlign+'px'
    },2500);
  }
  else { 
    //this.setPosition(this.top, this.left); 
    this.$node.animate({
      left: this.left+'px',
      top: this.top+'px'
    }, 2500);
  }
};
Dancer.prototype.step = function() {

  setTimeout(function() { 
    this.step(); 
  }.bind(this), this.timeBetweenSteps);
  
}
Dancer.prototype.setPosition = function(top, left) {
  var styleSettings = {
    top: top,
    left: left
  };
  this.$node.css(styleSettings);
}


