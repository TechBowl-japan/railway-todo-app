import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'; // 必要に応じて追加
import { CookiesProvider } from 'react-cookie'; // 必要に応じて追加
import { store } from './store';
import App from './App'; // Appコンポーネントのファイルパスに合わせて修正

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* Reduxストアを提供 */}
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
