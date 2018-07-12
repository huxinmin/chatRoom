import template from "template";
import "./index.less";
import renderSearch from "../../../components/search";
import renderTabs from "../../../components/tabs";


var source = "<li class=\"middle\"></li>";


const data = {

};
var render = template.compile(source);
var middleHtml = render(data);

const renderMiddle = (home)=>{
  home.append(middleHtml);
  var middle = $(".middle");
  renderSearch(middle);
  renderTabs(middle);
};

export default renderMiddle;