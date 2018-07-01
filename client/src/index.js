import './common.less';
import './utils/particles';
import './utils/fireworks';
import page from 'page';
import $ from 'jquery';
// login page
import {loginHtml, loginClass} from './routes/login';
import './routes/login/event';
import loadingLogin from './routes/login/loading'
// home page
import {homeHtml} from './routes/home';


const app = $('#app');
page.base('/chatRoom');

page('/login', function(){
	app.html(loginHtml);
	loadingLogin('.'+loginClass);
});

page('/home', function(){
	app.html(homeHtml);
});

page();