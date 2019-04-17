function getComponent() {
    // 异步加载lodash
    return import('lodash').then(_ => {
        var ele = document.createElement('div');
        ele.innerHTML = _.join(['Hello', 'World'], '-');
        return ele;
    })
}

getComponent().then(ele => {
    document.body.appendChild(ele);
})

