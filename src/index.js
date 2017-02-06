// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';
// import { Provider } from 'react-redux';
// import configureStore from './store/configure-store';
//
// const store = configureStore();
//
// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

import App from "./App";
import store from "./store/configure-store";

const app = document.getElementById('root')

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, app);