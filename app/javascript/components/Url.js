import React from "react";
import PropTypes from "prop-types";

class Url extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      reduced_url: {},
      spinner: false
    }
  }

  componentDidMount(){
    this.get_urls();
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
    this.showSpinner();
    const BASE_URL = 'localhost:3000/reduce_url';
    fetch('/urls.json', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
     })
    .then(response => response.json())
    .then(json => {
      this.hideSpinner();
      console.log(json);
      this.setState({reduced_url: json, spinner: false});
      console.log(this.state);
    });
  }

  render () {
    const reduceInputStyle = {
      backgroundColor: '#ffffff'
    };


    return (
      <div>
        {(() => {
          if (this.state.spinner === true){
            return(
              <div>
                Loading...
              </div>
            )
          }
        })()}
      </div>
    );
  }
}


Url.propTypes = {
  name: PropTypes.string
};

export default Url;
