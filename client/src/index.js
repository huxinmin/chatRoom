import "./common.less";
import "./utils/particles";
import "./utils/fireworks";
import page from "page";
import $ from "jquery";
import "./utils/locals";
import "./utils/db";
// login page
import renderLogin from "./routes/login";
// home page
import renderHome from "./routes/home";
import renderRegister from "./routes/register";
import './socket';

const app = $("#app");
page.base("/chatRoom");

page("/", ()=>{
  page.redirect("/login");
});

page("/login", ()=>{
  renderLogin(app);
});

page("/register", ()=>{
  renderRegister(app);
});

page("/home", ()=>{
  renderHome(app);
});

page();
