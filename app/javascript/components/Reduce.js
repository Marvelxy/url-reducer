import React from "react";
import PropTypes from "prop-types";

class Reduce extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){

  }



  componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }

  render () {
    const reduceInputStyle = {
      backgroundColor: '#ffffff'
    };

    const reduceButtonStyle = {
      color: '#676DA4',
      fontSize: '1.5rem',
      fontWeight: '400',
    };

    return (


          <div className="input-group mb-3">
            <input type="text" className="form-control form-control-lg" placeholder="Enter long URL" aria-label="Enter long URL" aria-describedby="basic-addon2" style={reduceInputStyle} />
            <div className="input-group-append">
              <button type="button" name="button" className="btn btn-light" style={reduceButtonStyle}>Reduce</button>
            </div>
          </div>
    );
  }
}


Reduce.propTypes = {
  name: PropTypes.string
};

export default Reduce;
