import React from "react";

const SearchBox = (props) => {

    function changeSearchValue(event){
        props.setSearchValue(event.target.value);
    }

    return (
        <div className="col">
            <input className="form-control" value={props.value} onChange={changeSearchValue} placeholder="Type to search ..."/>
        </div>
    )
}

export default SearchBox;