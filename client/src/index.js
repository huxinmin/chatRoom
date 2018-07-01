import page from 'page';
import $ from 'jquery';
import Login from './routes/login';
import './common.less';
import './utils/particles.js';
import './utils/fireworks.js';

const app = $('#app');
page.base('/chatRoom');

page('/login', function(){
	app.html(Login);
});


page();