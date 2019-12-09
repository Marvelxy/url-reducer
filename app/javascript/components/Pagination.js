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
    this.setState((state, props) => {
      return {paginatedURLs: state.items.slice(0, this.props.itemsperpage)};
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.paginatedURLs !== this.state.paginatedURLs) {
      //this.setState({paginatedURLs: prevState.paginatedURLs});
      console.log(this.state.paginatedURLs);
    }
  }


  nextItem = (e, itemsperpage, items) => {
    console.log(this.state.items);
    let URLList = items;
    let newPaginatedItems = URLList.slice(3, itemsperpage + 3);
    this.setState({paginatedURLs: newPaginatedItems});
    

    console.log(itemsperpage);
    console.log(this.state.paginatedURLs);
    console.log(items.slice(3, itemsperpage + 3));
    
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
        //console.log(this.paginatedURLs);
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
            <button className="float-right" onClick={(e) => this.nextItem(e, this.props.itemsperpage, this.props.items)}> Next {'>'}</button>
          </div>
        );
      })()}
      </div>
    );
  };
}

export default Pagination;
