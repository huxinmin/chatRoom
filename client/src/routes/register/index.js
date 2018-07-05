import "./index.less";
import regEvent from"./events";

var source = "<div class={{loginClass}}>"
+"<label for='avaterInput'><input id='avaterInput' type='file' style='display:none;'>选择头像</label>"
+"</div>";


const data = {

};
var render = template.compile(source);
var regHtml = render(data);

const renderRegister = (app)=>{
  app.html(regHtml);
  regEvent();
};

export default renderRegister;
