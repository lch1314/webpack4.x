function component() {
    var element = document.createElement('div');
    element.innerHTML = 'hello webapck';
  
    return element;
  }
  
  document.body.appendChild(component());