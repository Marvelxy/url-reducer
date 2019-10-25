import React from "react";
import PropTypes from "prop-types";
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      items: []
    }
  }


  componentDidMount(){
    const BASE_URL = 'localhost:3000/bookmarks.json';
    fetch('/bookmarks.json', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
     })
    .then(response => response.json())
    .then(json => {
      this.setState({items: json});

      console.log(this.state);
    });
  }


  render () {
    return (
      <div>
        <h1>Hello {this.props.name}, </h1>

        <h3>Wow! This is your first react component!</h3>
        <div>
          {
            this.state.items.map((item, index) => {
              let title = item.title;
              return(
                <p key={index}>{title}</p>
              )
            })
          }
        </div>
      </div>
    );
  }
}


Bookmarks.propTypes = {
  name: PropTypes.string
};

export default Bookmarks;
