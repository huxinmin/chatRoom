import template from 'template';
import './index.less';


var source = '<div class="search">'
+'search'
+'</div>'


const data = {

}
var render = template.compile(source);
var searchHtml = render(data);

const renderSearch = (middle)=>{
	middle.prepend(searchHtml);
}

export default renderSearch