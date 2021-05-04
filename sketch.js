var p5 = require("p5");
var convert = require('color-convert');

var len = 100;
var lengthSlider;

var angle;
var angleSlider;

var maxRecursion = 5;
var maxRecursionSlider;

var branches = 2;
var branchesSlider;

var lengthReduction = 0.75;
var lengthReductionSlider;

var halfAngle;

const s = ( p ) => {

	p.setup = function() {
	  	p.createCanvas(750, 750);
	  	angle = p.PI / 4;
	  	angleSlider = p.createSlider(0, p.PI, angle, 0.01);
	  	branchesSlider = p.createSlider(0, 5, branches, 1);
	  	maxRecursionSlider = p.createSlider(0, 10, maxRecursion, 1);
	  	lengthSlider = p.createSlider(0, 500, len, 1);
	  	lengthReductionSlider = p.createSlider(0, 1, lengthReduction, 0.0001);
	}

	p.draw = function() {
		angle = angleSlider.value();
		branches = branchesSlider.value();
		maxRecursion = maxRecursionSlider.value();
		len = lengthSlider.value();
		lengthReduction = lengthReductionSlider.value();

	  	p.background(0);

	  	halfAngle = angle * (branches - 1) * 0.5;

	  	p.stroke(255, 0, 0);
	  	p.translate(p.width / 2, p.height);
	  	p.line(0, 0, 0, -len);
	  	p.translate(0, -len);
	  	p.branch(0, len);
	}

	p.branch = function(recursion, length){
		p.stroke(convert.hsl.rgb(360 * recursion / maxRecursion, 100, 50));
		if(recursion == maxRecursion)
			return;
		for(let i = 0; i < branches; i++){
			p.push();
			p.rotate(i * angle - halfAngle);
			p.line(0, 0, 0, -length);
			p.translate(0, -length);
			p.branch(recursion + 1, length * lengthReduction);
			p.pop();
		}
	}
};

let myp5 = new p5(s);