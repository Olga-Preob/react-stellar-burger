const reactModalsInit = document.createElement('div');
reactModalsInit.setAttribute('id', 'react-modals');
document.body.append(reactModalsInit);

const reactModals = document.getElementById('react-modals');

const dataUrl = 'https://norma.nomoreparties.space/api/ingredients';

export { reactModals, dataUrl }
