import page from 'page';
import $ from 'jquery';
import Login from './routes/login';
import loadingLogin from './routes/login/loading'
import './common.less';
import './utils/particles';
import './utils/fireworks';

const app = $('#app');
page.base('/chatRoom');

page('/login', function(){
	app.html(Login);
	loadingLogin('.login-container');
});


page();