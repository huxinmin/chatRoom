const hisLimit = 50; //聊天记录最多条数

const createId = function(){
  function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(2);
  }
  return (S4()+S4()+"-"+S4()+"-"+new Date().getTime()+"-"+S4()+"-"+S4()+S4());
}

export {hisLimit, createId}
