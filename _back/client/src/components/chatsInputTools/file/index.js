import template from "template";
import fileSvg from "../../../svg/file";

var source = "<label for='fileupload' title='发送文件' class=\"tools-file\">"
+ fileSvg
+"<input type='file' id='fileupload' name='file' style='width:0;height:0;display:none;'>"
+"</label>";

var render = template.compile(source);

const renderToolFile = (chatsInputTools)=>{
  var fileHtml = render();
  chatsInputTools.append(fileHtml);
};

export default renderToolFile;
