import "./common.less";
import "./utils/particles";
import "./utils/fireworks";
import page from "page";
import $ from "jquery";
// login page
import renderLogin from "./routes/login";
// home page
import renderHome from "./routes/home";


const app = $("#app");
page.base("/chatRoom");

page("/login", function(){
  renderLogin(app);
});

page("/home", function(){
  renderHome(app);
});

page();