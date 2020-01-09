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

  reduce = () => {
    if(this.state.url.trim() !== ''){
      this.showSpinner();
      const BASE_URL = 'localhost:3000/reduce_url';
      fetch('/reduce-url.json', {
        method: 'POST',
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
      backgroundColor: '#ffffff',
      border: '1px solid #ffffff',
    };

    const reduceButtonStyle = {
      color: '#676DA4',
      fontSize: '1.5rem',
      fontWeight: '400',
    };

    const reduceLoaderStyle = {
      color: '#000000'
    }

    return (
      <div>
        {(() => {
          if(this.state.reduced_url.status === 200){
            return(
              <div className="">
                <div className="mb-2 border border-success">
                  <div className="border-bottom pl-1 bg-success">
                    <i className="fa fa-check-circle text-light"></i>
                    <span className="text-light"> URL Successfully Reduced</span>

                    <div className="float-right close-icon" onClick={this.closeNotification}>
                      <div className="bg-success text-light pl-1 pr-1">
                        <i className="fa fa-times"></i>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 pb-2 pl-1 bg-light">
                    http://url-reduzer.herokuapp.com/r/{this.state.reduced_url.reduced_url}
                  </div>
                </div>
              </div>
            )
          }
          else if(this.state.reduced_url.status === 400){
            return(
              <div className="">
                <div className="mb-2 border border-danger">
                  <div className="border-bottom pl-1 bg-danger">
                    <i className="fa fa-exclamation-circle text-light"></i>
                    <span className="text-light"> URL Reduction Failed</span>

                    <div className="float-right close-icon" onClick={this.closeNotification}>
                      <div className="bg-danger text-light pl-1 pr-1">
                        <i className="fa fa-times"></i>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 pb-2 pl-1 bg-light">
                  {(() => {
                    if('long' in this.state.reduced_url.errors){
                      return this.state.reduced_url.errors.long[0];
                    }
                    else {
                      return 'Something went wrong, try again.';
                    }
                  })()}
                  </div>
                </div>
              </div>
            )
          }
        })()}

        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control form-control-lg"
            id="reduce_url_input"
            placeholder="Enter long URL"
            aria-label="Enter long URL"
            aria-describedby="basic-addon2"
            style={reduceInputStyle}
            onChange={this.setURL}
            onKeyPress={(event) => {event.key === 'Enter' ? this.reduce() : ''}}
            autoFocus
          />

          <div className="input-group-append">
            {(() => {
              if(this.state.spinner === false){
                return(
                  <button
                    type="button"
                    name="button"
                    className="btn btn-light"
                    style={reduceButtonStyle}
                    onClick={this.reduce}
                  >
                    Reduce
                  </button>
                )
              }
              else{
                return(
                  <button
                    type="button"
                    className="btn btn-light"
                    style={reduceLoaderStyle}
                    disabled
                  >
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Reducing...
                  </button>
                )
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}


Reduce.propTypes = {
  name: PropTypes.string
};

export default Reduce;
