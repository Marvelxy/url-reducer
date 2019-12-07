import React from "react";

const buttonStyles = {
  border: "1px solid #ccc",
  background: "#fff",
  fontSize: "1em",
  padding: 10,
  margin: 5,
  width: 70
};

const Pagination = ({ itemsperpage, items, pagesspan }) => {
  return (
    <div
      itemsperpage={itemsperpage}
      items={items}
      pagesspan={pagesspan}
    >
    {(() => {
      return(
        <div>
          {
            items.slice(0, itemsperpage).map((url, index) => (
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
          <span>{'<'} Previous </span>
          <span className="float-right"> Next {'>'}</span>
        </div>
      );
    })()}
    </div>
  );
};

export default Pagination;
