'use strict'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import '../index.css';
import Root from './components/Dumb';

//rendering root react component to the main app div in index.html
ReactDOM.render(
    <Provider store={store}>
    <Root />
    </Provider>
    ,
    document.getElementById('app')
)
