import avatar from './04.jpg';
import style from './index.scss';
import createAvatar from './createAvatar';

createAvatar()

var img = new Image();
img.src = avatar;
img.classList.add(style.avatar)

var root = document.getElementById('root');
root.append(img);
