import {loginBtn} from './index';

import $ from 'jquery';
import page from 'page';

$(document).on('click', '#'+loginBtn, function(){
	page.redirect('/home');
})