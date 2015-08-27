
function BlinkyDancer(top, left, timeBetweenSteps){
  this._oldstep = Dancer.prototype.step;
  Dancer.apply(this, arguments);
}

BlinkyDancer.prototype = Object.create(Dancer.prototype);
BlinkyDancer.prototype.constructor = BlinkyDancer;

BlinkyDancer.prototype.step = function() {
  // We're supposed to call old step
  this._oldstep();

  // And then call blindancer.node.toggle
  this.$node.toggle();
};

