const unloadAlert = ()=>{
  $(window).on("beforeunload", (e) => {
    const confirMessage = "您确定要离开此页面么？";
    e.returnValue = confirMessage;
    return confirMessage;
  });
};

export default unloadAlert;
