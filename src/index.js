import _ from 'lodash';
import $ from 'jquery';

const dom = $('<div>');
dom.html(_.join(['hello', 'world'], '======='));
$('body').append(dom);



