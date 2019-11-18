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
      show: false,
      editLongURL:{
        longURL: ''
      }
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
    this.setState({show: true, editLongURL:{longURL: this.state.saved_urls[index].long}});
  }

  handleSubmit = (event) => {
    console.log(event.target.elements.editLongURL.value);
    event.preventDefault();
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
                          value={this.state.editLongURL.longURL}
                          onChange={(e) => this.setState({editLongURL: {longURL: e.target.value}})} />
                        <Form.Text className="text-muted">
                          You can enter a new URL or edit the existing URL.
                        </Form.Text>
                      </Form.Group>
                      <div style={{display: 'flex', justifyContent: 'center', alignItem: 'center'}}>
                        <Button variant="primary" type="submit">
                          Save
                        </Button>
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
