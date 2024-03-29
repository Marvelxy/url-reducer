import React from "react";
import PropTypes from "prop-types";
import {Modal, Form, Alert} from 'react-bootstrap';
import Pagination from "./Pagination";


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//import AddIcon from '@material-ui/icons/Add';

// Material ui icons
import DeleteIcon from '@material-ui/icons/Delete';
import Refresh from '@material-ui/icons/Refresh';
import Edit from '@material-ui/icons/Edit';

// Material ui colors
import { green } from '@material-ui/core/colors';

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
      currentPaginatedItems: [],
      page: 0,
      rowsPerPage: 5
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
    });
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
    let response = confirm("Are you sure you want to regenerate this URL?");
    if (response == true) {
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

  handleChangePage = (event, newPage) => {
    //setPage(newPage);
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value});
  };
  


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
                        <TableContainer component={Paper}>
                          <Table aria-label="a dense table" style={{maxWidth: '100%'}}>
                            <TableHead>
                              <TableRow>
                                <TableCell>Long</TableCell>
                                <TableCell>Short</TableCell>
                                <TableCell></TableCell>
                              </TableRow>
                            </TableHead>

                            <TableBody>
                              {this.state.saved_urls.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((url, index) => {
                                  //const isItemSelected = this.isSelected(row.name);
                                  //const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                  <TableRow
                                    key={index}
                                  >
                                    <TableCell>{url.long}</TableCell>
                                    <TableCell>
                                      <a href={"http://url-reduzer.herokuapp.com/r/" + url.short}>
                                        http://url-reduzer.herokuapp.com/r/{url.short}
                                      </a>
                                    </TableCell>
                                    <TableCell>
                                      
                                        <Tooltip title="Edit URL">
                                          <IconButton size="small" aria-label="edit" color="primary" onClick={(e) => this.show(e, index)}>
                                            <Edit />
                                          </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Regenerate URL">
                                          <IconButton
                                            size="small"
                                            aria-label="regenerate" 
                                            onClick={(e) => this.regenerateURL(e,index)}
                                            style={{ color: green[500] }}
                                          >
                                            <Refresh />
                                          </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete URL">
                                          <IconButton size="small" aria-label="delete" color="secondary" onClick={(e) => this.deleteURL(e,index)}>
                                            <DeleteIcon />
                                          </IconButton>
                                        </Tooltip>
                                     
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 25]}
                          component="div"
                          count={this.state.saved_urls.length}
                          rowsPerPage={this.state.rowsPerPage}
                          page={this.state.page}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
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
