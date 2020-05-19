import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Display from './display'


class App extends React.Component {
  constructor() {
    super ()
    this.state = {
      text:'',
      output:'',
    }
  }
  onTextChange = (event) => {
    this.setState({
      text: event.target.value
    })
    console.log(this.state.text)
  };
  submit = () => {
    this.setState({
      output:`/execute run execute as @s run execute store result entity @s Motion[0] run execute run execute at @p run execute run execute run execute as @s at @s run ${this.state.text}`
    })
  }
render() {
  return (
    <div>
      <Display onTextChange = {this.onTextChange} submit = {this.submit} output = {this.state.output}/>
    </div>
  );
};
}

export default App;
