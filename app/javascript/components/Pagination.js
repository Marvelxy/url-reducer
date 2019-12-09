import React from "react";

class Pagination extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      items: this.props.items,
      paginatedURLs: [],
    };
  }

  componentDidMount(){
    this.setState({paginatedURLs : this.props.items.slice(0, this.props.itemsperpage)});
  }


  nextItem = (e, itemsperpage) => {
    /*if(this.state.paginationStart === 0){
      this.setState({paginationStart: itemsperpage});
    }
    else{
      this.setState({paginationStart: this.state.paginationStart + itemsperpage});
      //this.setState({paginationStart: itemsperpage});
    }*/


    this.setState({paginatedURLs : this.props.items.slice(3, itemsperpage)});
    //this.paginationStart = this.paginationStart + itemsperpage;

    console.log(this.state.items);
    console.log(this.state.paginatedURLs);
    console.log(itemsperpage);
    
  }

  render (){
    const buttonStyles = {
      border: "1px solid #ccc",
      background: "#fff",
      fontSize: "1em",
      padding: 10,
      margin: 5,
      width: 70
    };

    return (
      <div>
      {(() => {
        
        return(
          <div>
            {
              this.state.paginatedURLs.map((url, index) => (
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
                    <button type="button" className="btn btn-light text-success" onClick={(e) => this.regenerateURL(e,index)}>
                      <i className="fas fa-redo fa-xs"></i> Regenerate
                    </button>
                    <button type="button" className="btn btn-light text-danger" onClick={(e) => this.deleteURL(e,index)}>
                      <i className="fas fa-trash fa-xs"></i> Delete
                    </button>
                  </div>
                </div>
              ))
            }
            <button>{'<'} Previous </button>
            <button className="float-right" onClick={(e) => this.nextItem(e, this.props.itemsperpage)}> Next {'>'}</button>
          </div>
        );
      })()}
      </div>
    );
  };
}

export default Pagination;
