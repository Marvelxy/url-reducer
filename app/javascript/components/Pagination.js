import React from "react";

class Pagination extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      items: this.props.items,
      paginatedURLs: [],
    };

    this.paginationStart = 0;
    this.itemsPerPage = this.props.itemsperpage;
  }

  componentDidMount(){
    this.setState((state, props) => {
      return {paginatedURLs: state.items.slice(this.paginationStart, this.itemsPerPage)};
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.paginatedURLs !== this.state.paginatedURLs) {
      //this.setState({paginatedURLs: prevState.paginatedURLs});
      //console.log(this.state.paginatedURLs);
    }
  }


  nextItem = (e, itemsperpage, items) => {
    let newStart = this.paginationStart + itemsperpage;
    let newEnd = this.itemsPerPage + itemsperpage;

    let newPaginatedItems = items.slice(newStart, newEnd);
    this.setState({paginatedURLs: [...newPaginatedItems]});

    this.paginationStart = newStart;
    this.itemsPerPage = newEnd;
  }

  previousItem = (e, itemsperpage, items) => {
    let newStart = this.paginationStart - itemsperpage;
    let newEnd = this.itemsPerPage - itemsperpage;

    let newPaginatedItems = items.slice(newStart, newEnd);
    this.setState({paginatedURLs: [...newPaginatedItems]});

    this.paginationStart = newStart;
    this.itemsPerPage = newEnd;
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
            <div className="row">
              <div className="col">
                <button 
                  onClick={(e) => this.previousItem(e, this.props.itemsperpage, this.props.items)} 
                  disabled={this.paginationStart < this.props.itemsperpage ? true : false}
                >
                  {'<'} Previous 
                </button>
              </div>
              <div className="col">
                <p className="text-center">
                  {
                    
                    'Page' +
                    (Math.ceil(this.paginationStart / this.props.itemsperpage) + 1)
                    + ' of ' + 
                    Math.ceil(this.state.items.length / this.props.itemsperpage)
                  }
                </p>
              </div>
              <div className="col">
                <button 
                  className="float-right" 
                  onClick={(e) => this.nextItem(e, this.props.itemsperpage, this.props.items)}
                  disabled={this.state.items.length < this.itemsPerPage ? true : false}
                > 
                  Next {'>'}
                </button>
              </div>
            </div>        
          </div>
        );
      })()}
      </div>
    );
  };
}

export default Pagination;
