import React from 'react';
import axios from 'axios';

import './App.css';

class App extends React.Component{
  state = { advice: '' };

  componentDidMount(){
    this.fetchAdvice();

    var animateButton = function(e) {
      //reset animation
      e.target.classList.remove('animate');
      
      e.target.classList.add('animate');
      setTimeout(function(){
        e.target.classList.remove('animate');
      },700);
    };
    
    var bubblyButtons = document.getElementsByClassName("btn");
    
    for (var i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton, false);
    }
  }

  fetchAdvice = () => {
    axios.get('https://api.adviceslip.com/advice')
      .then((response) => {
        const { advice } = response.data.slip;
        
        //this.setState({ advice: advice });
        this.setState({ advice });
      })

      .catch((error) => {
        console.log(error);
      })
  }

  render(){
    const { advice } = this.state;

    return(
        <div className="container">
          <div className="section1">
              <h1 className="advice">{ advice }</h1>
              <button className="btn" onClick={ this.fetchAdvice }>Generate Advice</button>
          </div>
        </div>
    );
  }
}

export default App;