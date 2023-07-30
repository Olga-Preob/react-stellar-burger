const reactModalsInit = document.createElement('div');
reactModalsInit.setAttribute('id', 'react-modals');
document.body.append(reactModalsInit);

const reactModals = document.getElementById('react-modals');

const baseUrl = 'https://norma.nomoreparties.space/api';

export { reactModals, baseUrl }
