import React from "react";
import PropTypes from "prop-types";

class Reduce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      reduced_url: {},
      spinner: false
    }
  }

  componentDidMount(){

  }

  componentWillUnmount() {
    /*Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');*/
  }

  setURL = (event) => {
    this.setState({url: event.target.value});
  }

  showSpinner = () => {
    this.setState({spinner: true})
  }

  hideSpinner = () => {
    this.setState({spinner: false})
  }

  closeNotification = () => {
    this.setState({reduced_url: {}});
    document.getElementById('reduce_url_input').value = '';
  }

  get_urls = () => {
    if(this.state.url.trim() !== ''){
      this.showSpinner();
      const BASE_URL = 'localhost:3000/reduce_url';
      fetch('/reduce-url.json', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({url: this.state.url.trim()}) // body data type must match "Content-Type" header
       })
      .then(response => response.json())
      .then(json => {
        //this.hideSpinner();
        this.setState({reduced_url: json, spinner: false});
        console.log(this.state);
      });
    }
    else {
      alert("You must enter URL!");
      document.getElementById('reduce_url_input').value = '';
    }
  }

  render () {
    const reduceInputStyle = {
      backgroundColor: '#ffffff'
    };


    return (
      <div>

      </div>
    );
  }
}


Url.propTypes = {
  name: PropTypes.string
};

export default Url;
