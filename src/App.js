import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import LayoutDesign from './layoutDesign';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Product Layout Designer</h1>
        <LayoutDesign />
      </div>
    </Provider>
  );
}

export default App;


