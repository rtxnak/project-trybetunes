import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './Components/Content';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <div>
          <Content />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
