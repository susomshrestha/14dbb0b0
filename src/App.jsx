import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header.jsx';
import './css/app.css';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <div className="container-view">
        <div>
          <span className='text-3xl'>Hello</span>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
