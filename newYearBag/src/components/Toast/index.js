
import './styles';

// 提醒

function ToastComponent(option) {
    let text = document.createElement('div');
    text.className = 'toast__text';
    let node = document.createTextNode(option.data.text);
    text.appendChild(node);

    option.el.className = 'toast-wrap';
    option.el.appendChild(text);

    this.$el = option.el;
}

const Toast = (option) => {
    const instance = new ToastComponent({
        el: document.createElement('div'),
        data: option
    });

    document.body.appendChild(instance.$el);

    setTimeout(() => {
        document.body.removeChild(instance.$el);
    }, option.duration || 2500);
}

export default Toast;
