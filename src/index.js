import React from 'react';
import { createRoot } from 'react-dom/client';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { rootReducer } from './services/reducers/index';
import reportWebVitals from './reportWebVitals';
import App from './components/app/app';
import './index.css';


const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
