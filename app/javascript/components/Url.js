import React from "react";
import PropTypes from "prop-types";
import {Modal, Button, Form} from 'react-bootstrap';

class Url extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      saved_urls: [],
      spinner: false,
      editUrlSpinner: false,
      show: false,
      editLongURL:{
        url: '',
      },
      oldLongURL: '',
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
      this.setState({saved_urls: json, spinner: false});
    });
  }

  handleClose = () => this.setState({show: false});
  show = (event,index) => {
    this.setState({
      show: true,
      editLongURL:{
        url: this.state.saved_urls[index].long
      },
      oldLongURL: this.state.saved_urls[index].long
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  editUrl = () => {
    this.setState({editUrlSpinner: true});
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    console.log(this.state);

    fetch('/edit-reduced-url.json', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({
        oldLongURL: this.state.oldLongURL.trim(),
        editedLongURL: this.state.editLongURL.url.trim(),
      }) // body data type must match "Content-Type" header
     })
    .then(response => response.json())
    .then(json => {
      //this.hideSpinner();
      this.setState({editUrlSpinner: false});
      console.log(json);
    });

    /*if(this.state.url.trim() !== ''){
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
    }*/
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
                        <button type="button" className="btn btn-light text-primary" onClick={(e) => this.show(e,index)}>
                          <i className="fas fa-edit fa-xs"></i> Edit
                        </button>
                        <button type="button" className="btn btn-light text-success">
                          <i className="fas fa-redo fa-xs"></i> Regenerate
                        </button>
                        <button type="button" className="btn btn-light text-danger">
                          <i className="fas fa-trash fa-xs"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))
                }
                <Modal show={this.state.show} onHide={this.handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit URL</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="editLongURL">
                        <Form.Label>Long URL</Form.Label>
                        <Form.Control as="textarea" rows="3" placeholder="Enter long URL"
                          value={this.state.editLongURL.url}
                          onChange={(e) => this.setState({editLongURL: {url: e.target.value}})} />
                        <Form.Text className="text-muted">
                          You can enter a new URL or edit the existing URL.
                        </Form.Text>
                        <Form.Text className="text-warning">
                          You can only edit the long url. To edit the reduzed url, click on the regenerate button.
                        </Form.Text>
                      </Form.Group>
                      <div style={{display: 'flex', justifyContent: 'center', alignItem: 'center'}}>
                        {(() => {
                          if(this.state.editUrlSpinner === false){
                            return(
                              <Button variant="primary" type="submit" onClick={this.editUrl}>
                                Save
                              </Button>
                            )
                          }
                          else{
                            return(
                              <button
                                type="button"
                                className="btn btn-light"
                                disabled
                              >
                                <span
                                  className="spinner-border spinner-border-sm"
                                  role="status"
                                  aria-hidden="true"
                                ></span>
                                Editing URL...
                              </button>
                            )
                          }
                        })()}
                      </div>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>

                    {/*<Button variant="primary" onClick={this.handleClose}>
                      Save Changes
                    </Button> */}
                  </Modal.Footer>
                </Modal>
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
