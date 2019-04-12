// import './style.css';

// var btn = document.createElement('button');
// btn.innerHTML = '新增';
// document.body.appendChild(btn);

// btn.onclick = function() {
//     var div = document.createElement('div');
//     div.innerHTML = 'item';
//     document.body.appendChild(div)
// }

import counter from './counter.js';
import number from './number.js';
counter();
number();

if(module.hot) {
    // 如果number这个文件发生了变化，那么久会执行后面这个函数,让number()重新执行下
    module.hot.accept('./number', () => {
        let abc = document.getElementById('number');
        document.body.removeChild(abc);
        number();
    })         
}