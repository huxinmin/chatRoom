import anime from 'anime';
import $ from 'jquery';

const loadingLogin = function(target){
	anime({
  	targets: target,
  	duration:200,
  	translateY: [-600, 0],
  	scaleY: [
    	{ value: 1.5, duration: 100, delay: 50, easing: 'easeOutExpo' },
    	{ value: 1, duration: 50 }
  	],
  	easing: 'easeInOutSine',
  	elasticity:200
	});
}

export default loadingLogin