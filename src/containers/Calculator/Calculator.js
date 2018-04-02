import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor(props){
    super(props);
    this.state = {
      height: '',
      weight: '',
      resultString: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  resetInput(){
    this.setState({height: '', weight: '', resultString: ''});
  }

  handleSubmit(event) {
    event.preventDefault();
    // alert('Submitted: ' + this.state.height + ' ' + this.state.weight);
    if(this.state.height === null || this.state.height <= 0 || this.state.weight === null || this.state.weight <= 0){
      alert('Enter Valid Input');
      return;
    }

    const heightSquare = (this.state.height/100) * (this.state.height/100);
    const bmiValue = (this.state.weight) / heightSquare;

    let updatedResultString = '';

    if(bmiValue < 18.5){
      updatedResultString = 'Underweight';
    }
    else if(bmiValue < 24.9){
      updatedResultString = 'Normal';
    }
    else if(bmiValue < 29.9){
      updatedResultString = 'Overweight';
    }
    else if(bmiValue < 39.9){
      updatedResultString = 'Medically Obese';
    }
    else{
      updatedResultString = 'Extremely Obese'
    }

    this.setState({resultString: updatedResultString});
  }

  render(){
    let outputString = (
      <h3>{this.state.resultString}</h3>
    );

    const style = {
      color: '#FF0000'
    };

    if(this.state.resultString === 'Medically Obese' || this.state.resultString === 'Overweight' || this.state.resultString === 'Extremely Obese'){
      outputString = (
        <h3 style={style}>{this.state.resultString}</h3>
      );
    }

    return(
      <div className='calculator'>
        <h1>BMI Calculator</h1>
        <form>
          <label>Height:</label>
          <input
            name='height'
            placeholder='Height in cm'
            type='number'
            step='.01'
            value={this.state.height}
            onChange={this.handleInputChange} />
          <br/>
          <label>Weight:</label>
          <input
            name='weight'
            placeholder='Weight in kg'
            type='number'
            step='.01'
            value= {this.state.weight}
            onChange={this.handleInputChange} />
          <br/>
          <div className='button-container'>
            <button className="success" onClick={this.handleSubmit}  disabled={this.state.height==='' || this.state.weight===''}>Calculate</button>
            <button className="danger" onClick={this.resetInput} disabled={this.state.weight==='' || this.state.height===''}>Reset</button>
          </div>
        </form>
        {outputString}
      </div>
    );
  }
}

export default Calculator;
