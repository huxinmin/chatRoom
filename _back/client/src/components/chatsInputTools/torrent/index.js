import template from "template";
import torrentSvg from "../../../svg/torrent";

var source = "<div title='P2P分享' class=\"tools-torrent\">"
+torrentSvg
+"</div>";

var render = template.compile(source);

const renderToolTorrent = (chatsInputTools)=>{
  var torrentHtml = render();
  chatsInputTools.append(torrentHtml);
};

export default renderToolTorrent;
