import template from 'template';
import './index.less';
import renderLeft from './left';
import renderMiddle from './middle';
import renderRight from './right';

var source = '<ul class="home"></ul>'


const data = {

}
var render = template.compile(source);
var homeHtml = render(data);

const renderHome = (app)=>{
	app.html(homeHtml);
	const home = app.children('.home');
	renderLeft(home);
	renderMiddle(home);
	renderRight(home);
}

export default renderHome