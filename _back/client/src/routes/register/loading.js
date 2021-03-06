const loadingRegister = function(target){
  anime({
    targets: target,
    duration:200,
    marginTop: [-1000, -200,],
    height: [
      { value: "600px", duration: 100, delay: 50, easing: "easeOutExpo", },
      { value: "500px", duration: 50, },
    ],
    easing: "easeInOutSine",
    elasticity:100,
  });
};

export default loadingRegister;
