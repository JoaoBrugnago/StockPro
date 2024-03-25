import ReactDOM from 'react-dom';

export default function toggleModal(modalComponent) {
  let modalRoot = document.getElementById('modal-root');
    
  if (!modalRoot) {
    modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);
  }
  
  const toggleModal = () => {
    if (modalComponent) {
        document.body.classList.add('modal-open');
        ReactDOM.render(modalComponent, modalRoot);
    } else {
        document.body.classList.remove('modal-open');
        ReactDOM.unmountComponentAtNode(modalRoot);
    }
  };
  toggleModal();

  return () => {
    ReactDOM.unmountComponentAtNode(modalRoot);
  };
}