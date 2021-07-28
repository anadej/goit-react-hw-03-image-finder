import React, { Component } from "react";
import { SearchFormStyled } from "./SearchFormStyled";

class SearchForm extends Component {
  state = { searchbar: "" };

  onHandleChange = (e) => {
    this.setState({ searchbar: e.target.value });
  };

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchbar);
  };

  render() {
    return (
      <SearchFormStyled>
        <form className="SearchForm" onSubmit={this.onHandleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onHandleChange}
          />
        </form>
      </SearchFormStyled>
    );
  }
}

export default SearchForm;
