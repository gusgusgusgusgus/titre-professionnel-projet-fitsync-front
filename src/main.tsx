import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// on importe le composant provider de store pour englober tout notre arbre de composant ce qui mettra le store à dispo de tous nos composants
import { Provider } from 'react-redux';
// on importe le store pour le donner au provider
import store from './store/store';

import App from './components/App/App';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
