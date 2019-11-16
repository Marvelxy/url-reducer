import React from "react";
import PropTypes from "prop-types";

class Url extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      saved_urls: [],
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
      //console.log(json);
      this.setState({saved_urls: json, spinner: false});
      //console.log(this.state);
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
              <div className="spinner-border" style={{width: '3rem', height: '3rem', color: '#676DA4'}} role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )
          }
          else{
            return(
              <div>
                {
                  this.state.saved_urls.map((url, index) => (
                    <div
                      key={index}
                      className="pt-3 pl-3 pr-3 pb-1 url-item"
                    >
                      <div>
                        Long URL: <span className="">{url.long}</span>
                      </div>
                      <div>
                        Short URL:&nbsp;
                        <a href={"http://url-reduzer.herokuapp.com/r/" + url.short}>
                          http://url-reduzer.herokuapp.com/r/{url.short}
                        </a>
                      </div>
                      <div className="btn-group btn-group-sm mt-2" role="group" aria-label="Basic example">
                        <button type="button" className="btn btn-light text-primary">
                          <i class="fas fa-edit"></i> Edit
                        </button>
                        <button type="button" className="btn btn-light text-success">
                          <i class="fas fa-redo"></i> Regenerate
                        </button>
                        <button type="button" className="btn btn-light text-danger">
                          <i class="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))
                }
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
