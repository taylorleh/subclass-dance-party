function FarmerDancer(top, left, timeBetweenSteps) {
  this._oldstep = Dancer.prototype.step;
  Dancer.apply(this, arguments);
  this.$node.prepend('<img src="sprites/farmer.gif">');
  this.$node.addClass('farmer');
}

FarmerDancer.prototype = Object.create(Dancer.prototype);
FarmerDancer.prototype.constructor = FarmerDancer;
FarmerDancer.prototype.colors = ['red','blue','green','yellow','purple','cyan'];
FarmerDancer.prototype.step = function() {
  // this._oldstep();
  const change = 75;
  // this.timeBetweenSteps-1
  var randomTime = Math.floor(Math.random() * 2000);
  if (!this.stopMoving) {

    // if the farmer is really close to a bee, shrink and regrow
    if (this.checkCollision()) {
      // this.$node.children()[0];
      this.$node.children().eq(0).animate({
        height:'-=40px'
      }, {
        duration:800,
        done:function() {
          $(this).animate({height:'+=40'})
        },
        complete:function() {          
          this._oldstep();
        }.bind(this)
      });
    }

    else {
      var leftChange = Math.random()*change-(.5*change);
      var topChange = Math.random()*change-(.5*change);

      this.$node.animate({
        left: Math.max(this.left+leftChange,0)+'px',
        top: Math.max(this.top+topChange,0)+'px'
      },{
        duration:randomTime,
        done:function(){
          this._oldstep();
        }.bind(this)

      });
    }
  }
}

FarmerDancer.prototype.checkCollision = function() {
  for (var i = 0; i < window.dancers.length; i++) {
    if (window.dancers[i] instanceof SlidingDancer) {
      var leftDist = this.left - window.dancers[i].left;
      var topDist = this.top - window.dancers[i].top;

      var distance = Math.sqrt(Math.pow(leftDist,2)+Math.pow(topDist,2));

      if (distance < 25) { return true; }
    }
  }
  return false;
}