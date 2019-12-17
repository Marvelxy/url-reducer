import React from "react";
import PropTypes from "prop-types";
import {Modal, Button, Form, Alert} from 'react-bootstrap';
import Pagination from "./Pagination";

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
      urlEditResponse: [],
      urlEditAlert: false,
      current_url_on_edit: '',
      showRegenerateModal: false,
      currentUrlOnRegenerate: '',
      regenerateSpinner: true,
      currentUrlOnDelete: '',
      deleteSpinner: true,
      showDeleteModal: false,
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
      },
     })
    .then(response => response.json())
    .then(json => {
      this.hideSpinner();
      let reversed_urls = json.reverse();
      this.setState({saved_urls: reversed_urls, spinner: false});
    });
  }

  handleClose = () => this.setState({show: false});
  show = (event,index) => {
    this.setState({
      show: true,
      editLongURL:{
        url: this.state.saved_urls[index].long
      },
      oldLongURL: this.state.saved_urls[index].long,
      urlEditAlert: false,
      current_url_on_edit: index
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  editUrl = () => {
    this.setState({editUrlSpinner: true});

    if (this.state.editLongURL.url){
      if(this.state.urlEditResponse.new_url !== this.state.editLongURL.url){
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
          if(json.status === 200){
            this.setState({editUrlSpinner: false, urlEditResponse: json, urlEditAlert: true});
            let old_saved_urls = this.state.saved_urls;
            let edited_url = this.state.current_url_on_edit
            //let new_saved_urls = old_saved_urls[edited_url].long = this.state.editLongURL.url.trim();
            old_saved_urls[edited_url].long = this.state.editLongURL.url.trim();
            this.setState({saved_urls: old_saved_urls});
            //console.log([...this.state.saved_urls])
          }
        });
      }
      else{
        alert('Nothing changed so far :)');
        this.setState({editUrlSpinner: false});
      }
    }
    else{
      alert("URL can't be blank!");
      this.setState({editUrlSpinner: false});
    }
  }

  regenerateURL = (event, index) => {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    this.setState({
      showRegenerateModal: true,
      currentUrlOnRegenerate: index,
      regenerateSpinner: true,
    });

    fetch('/regenerate-long-url.json', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-CSRF-Token': csrf
      },
      body: JSON.stringify({
        oldShortURLId: this.state.saved_urls[index].id,
      }) // body data type must match "Content-Type" header
     })
    .then(response => response.json())
    .then(json => {
      //this.hideSpinner();
      if(json.status === 200){
        let old_saved_urls = this.state.saved_urls;
        let edited_url = this.state.currentUrlOnRegenerate
        old_saved_urls[edited_url].short = json.new_short_url;
        this.setState({saved_urls: old_saved_urls, regenerateSpinner: false});
        setTimeout(() => {
          this.setState({showRegenerateModal: false});
        }, 700);
      }
    });
  }

  deleteURL = (event, index) => {
    let response = confirm("Are you sure you want to delete this?");
    if (response == true) {
      const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

      this.setState({
        showDeleteModal: true,
        currentUrlOnDelete: index,
        regenerateSpinner: true,
      });

      fetch('/delete-url.json', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
          'X-CSRF-Token': csrf
        },
        body: JSON.stringify({
          URLId: this.state.saved_urls[index].id,
        }) // body data type must match "Content-Type" header
      })
      .then(response => response.json())
      .then(json => {
        if(json.status === 200){
          let old_saved_urls = this.state.saved_urls;
          //let url_to_delete = this.state.currentUrlOnDelete
          //old_saved_urls[url_to_delete].short = json.new_short_url;
          old_saved_urls.splice(index,1);
          this.setState({saved_urls: old_saved_urls});
          setTimeout(() => {
            this.setState({showDeleteModal: false});
          }, 700);
          console.log(json)
        }
      });
    }
  }

  render () {
    const regenerateSpinnerSuccessColor = {
      color: '#1c9f64'
    };

    return (
      <div>
        {(() => {
          if (this.state.spinner === true){
            return(
              <div className="row justify-content-center">
                <div className="col-2">
                  <div className="spinner-border" style={{width: '3rem', height: '3rem', color: '#676DA4'}} role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
            )
          }
          else{
            return(
              <div>
                {(() => {
                  if(this.state.saved_urls.length === 0){
                    return(
                      <div>
                        <div className="row justify-content-center">
                          <img 
                            src={require('../images/No_list_found.png')} 
                            alt="No reduced URL"
                            className="col-7"
                          />
                        </div>
                        <p className="text-danger text-center">
                          <strong>You have no reduced URL!</strong>
                        </p>
                      </div>
                    )
                  }
                  else{
                    return (
                      <div>
                        <Pagination
                          itemsperpage={4}
                          items={this.state.saved_urls}
                          regenerateURL={this.regenerateURL}
                          editURL={this.show}
                          deleteURL={this.deleteURL}
                        />
                      </div>
                    )
                  }
                })()}

                <Modal show={this.state.show} onHide={this.handleClose} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit URL</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {(() => {
                      if(this.state.urlEditAlert){
                        return(
                          <Alert variant="success" onClose={() => this.setState({urlEditAlert: false})} dismissible>
                            <Alert.Heading>Great!</Alert.Heading>
                            <p>
                              URL successfully reduced.
                            </p>
                          </Alert>
                        )
                      }
                    })()}
                    <Form onSubmit={this.handleSubmit}>
                      <Form.Group controlId="editLongURL">
                        <Form.Label>Long URL:</Form.Label>
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
                                className="btn btn-primary"
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
                  </Modal.Footer>
                </Modal>

                <Modal size="sm" show={this.state.showRegenerateModal} onHide={this.handleClose} centered>
                  <Modal.Header>
                    <Modal.Title>Regenerating short URL</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {
                      (() => {
                        if(this.state.regenerateSpinner){
                          return(
                            <div className="row justify-content-center">
                              <div className="col-4">
                                <div className="spinner-border" style={{width: '3rem', height: '3rem', color: '#676DA4'}} role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        else{
                          return(
                            <div className="text-center">
                              {/* Short URL Regenerated! */}
                              <i className="fas fa-check-circle fa-5x" style={regenerateSpinnerSuccessColor}></i>
                            </div>
                          )
                        }
                      })()
                    }
                  </Modal.Body>
                  {/*<Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>*/}
                </Modal>

                <Modal size="sm" show={this.state.showDeleteModal} onHide={this.handleClose} centered>
                  <Modal.Header>
                    <Modal.Title>Deleting URL</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {
                      (() => {
                        if(this.state.regenerateSpinner){
                          return(
                            <div className="row justify-content-center">
                              <div className="col-4">
                                <div className="spinner-border" style={{width: '3rem', height: '3rem', color: '#676DA4'}} role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        else{
                          return(
                            <div className="text-center">
                              {/* Short URL Regenerated! */}
                              <i className="fas fa-check-circle fa-5x" style={regenerateSpinnerSuccessColor}></i>
                            </div>
                          )
                        }
                      })()
                    }
                  </Modal.Body>
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
