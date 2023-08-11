const reactModalsInit = document.createElement('div');
reactModalsInit.setAttribute('id', 'react-modals');
document.body.append(reactModalsInit);

const reactModals = document.getElementById('react-modals');

const baseUrl = 'https://norma.nomoreparties.space/api';
const headers = {
  'Content-Type': 'application/json'
}

export { reactModals, baseUrl, headers }
