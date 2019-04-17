// function getComponent() {
//     return import(/*webpackChunkName:"lodash" */'lodash').then(_ => {
//         var ele = document.createElement('div');
//         ele.innerHTML = _.join(['Hello', 'World'], '-');
//         return ele;
//     })
// }

// getComponent().then(ele => {
//     document.body.appendChild(ele);
// })


// 同步引入lodash
import _ from 'lodash';
import jquery from 'jquery';
var ele = document.createElement('div');
ele.innerHTML = _.join(['Hello', 'World'], '-');
document.body.appendChild(ele);

// import test from './test.js';
// console.log(test.name)


