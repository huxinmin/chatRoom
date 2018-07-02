import template from 'template';
import './index.less';

import searchSvg from '../../svg/search';
import addSvg from '../../svg/add';
import searchEvent from './events';

var source = '<div class="search">'
+  '<div class="search-input">'
+    searchSvg
+    '<input type="text" placeholder={{placeholder}}>'
+  '</div>'
+  '<div class="create" title={{createTitle}}>'+addSvg+'</div>'
+'</div>'


const data = {
	placeholder:'查找用户或群组',
	createTitle:"创建群组"
}
var render = template.compile(source);
var searchHtml = render(data);

const renderSearch = (middle)=>{
	middle.prepend(searchHtml);
	searchEvent();
}

export default renderSearch
