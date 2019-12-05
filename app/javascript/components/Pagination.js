import React from "react";

const buttonStyles = {
  border: "1px solid #ccc",
  background: "#fff",
  fontSize: "1em",
  padding: 10,
  margin: 5,
  width: 70
};

const Pagination = ({ itemsperpage, nocolumns, items, pagesspan }) => {
  return (
    <div
      itemsperpage={itemsperpage}
      nocolumns={nocolumns}
      items={items}
      pagesspan={pagesspan}
    >
    {(() => {
      //alert();
      return(
        <div>
          <span>{'<'} Previous </span>
          <span className="float-right"> Next {'>'}</span>
        </div>
      );
    })()}
    </div>
  );
};

export default Pagination;
