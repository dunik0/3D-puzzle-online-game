import Main from './components/Main';
import './style.css';

function init() {
    //div
    const container = document.getElementById('root');
    //main class object
    new Main(container);
}

init();