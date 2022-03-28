import React from "react";
import './SearchBar.css';

let term = '';

export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.myRef = React.createRef();
    }

    search() {
        // console.log(term);
        this.props.onSearch(term);
        const node = this.myRef.current;
        node.value = '';
    }

    handleTermChange(e) {
        term = e.target.value;
    }

    render() {
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange} ref={this.myRef} />
                <button className="SearchButton" onClick={this.search}>SEARCH</button>
            </div>
        );
    }
}