function FarmerDancer(top, left, timeBetweenSteps) {
  top = Math.random()*(window.innerHeight*.2)+(window.innerHeight*.65);
  this.leftBound = 0;
  this.topBound = 0;
  this.bottomBound = window.innerHeight;
  this.rightBound = window.innerWidth;
  this.change = 75;
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
    if (this.hasAnyCollisions(SlidingDancer,25)) {
      
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
      this.move(this.change, 0, this.leftBound, this.topBound, this.rightBound, this.bottomBound, randomTime);
    }
  }
}
