import page from 'page';
import $ from 'jquery';
import Login from './routes/login';

const app = $('#app');
page.base('/chatRoom');

page('/', function(){
	console.log(1)
	app.html(Login)
});

page('/test', function(){
	console.log(2)
});

page();