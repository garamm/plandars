import React from 'react';
import './App.css';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Detail from './components/Detail';

class App extends React.Component {

  state = {
    ttt: 'sss',
    pickYear: new Date().getFullYear(),
    pickMonth: new Date().getMonth() + 1,
    pickDate: new Date().getDate(),
    planList: []
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
        <Header />
        <div className="wrapper">
          <Calendar
            onUpdatePick={this.updatePick}
            pickYear={this.state.pickYear}
            pickMonth={this.state.pickMonth}
            pickDate={this.state.pickDate}
            planList={this.state.planList} />
          <Detail />
        </div>
        {/* {this.state.ttt} */}
      </div>
    );
  }
}

export default App;
