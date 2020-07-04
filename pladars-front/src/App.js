import React from 'react';
import './App.css';
import Header from './components/Header';
import Calendar from './components/Calendar';

class App extends React.Component {

  state = {
    ttt: 'sss',
    pickYear: new Date().getFullYear(),
    pickMonth: new Date().getMonth() + 1,
    pickDate: new Date().getDate()
  };

  constructor(props) {
    super(props);
    this.updatePick.bind();
  }

  updatePick = (text) => {
    this.setState({ ttt: text });
  }

  render() {
    return (
      <div className="App">
        {this.state.ttt}
        <Header />
        <Calendar
          onUpdatePick={this.updatePick}
          pickYear={this.state.pickYear}
          pickMonth={this.state.pickMonth}
          pickDate={this.state.pickDate} />
      </div>
    );
  }
}

export default App;
