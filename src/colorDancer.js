function ColorDancer(top, left, timeBetweenSteps) {
	this._oldstep = Dancer.prototype.step;
	Dancer.apply(this, arguments);
}

ColorDancer.prototype = Object.create(Dancer.prototype);
ColorDancer.prototype.constructor = ColorDancer;
ColorDancer.prototype.colors = ['red','blue','green','yellow','purple','cyan'];
ColorDancer.prototype.step = function() {
	this._oldstep();

	
	var coloridx = Math.floor(Math.random()*this.colors.length);
	this.$node.css("border-color",this.colors[coloridx]);
}

