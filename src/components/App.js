import React, { Component } from "react";
import { getImagesOnSearch } from "../services/api";
import { AppStyled } from "./AppStyled";
import ButtonLoadMore from "./buttonLoadMore/ButtonLoadMore";
import ImageGallery from "./imageGallery/ImageGallery";
import SearchForm from "./searchbar/SearchForm";
import Loader from "react-loader-spinner";
import Modal from "./modal/Modal";

class App extends Component {
  state = {
    images: [],
    searchbar: "",
    page: 1,
    isLoading: false,
    isLoadingMore: false,
    modalImageURL: "",
  };

  toggleModal = (largeImageURL = "") => {
    this.setState({
      modalImageURL: largeImageURL,
    });
  };

  onSearchSubmit = (searchbar) => {
    this.setState({ images: [], isLoading: true });
    getImagesOnSearch(searchbar)
      .then((images) => {
        this.setState({
          images: [...images],
          searchbar: searchbar,
          page: 2,
        });
      })
      .catch((error) => console.log(`error`, error))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  onLoadMore = () => {
    this.setState({ isLoadingMore: true });
    getImagesOnSearch(this.state.searchbar, this.state.page)
      .then((images) => {
        this.setState((prev) => ({
          images: [...prev.images, ...images],
          page: prev.page + 1,
        }));
      })
      .catch((error) => console.log(`error`, error))
      .finally(() => {
        this.setState({ isLoadingMore: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      });
  };

  render() {
    const { isLoading, isLoadingMore, modalImageURL } = this.state;
    return (
      <AppStyled>
        {!!modalImageURL && (
          <Modal modalImageURL={modalImageURL} toggleModal={this.toggleModal} />
        )}
        <SearchForm onSubmit={this.onSearchSubmit} />
        {isLoading && (
          <div className="loader">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </div>
        )}
        <ImageGallery
          images={this.state.images}
          toggleModal={this.toggleModal}
        />

        {isLoadingMore && (
          <div className="loader">
            <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
          </div>
        )}
        {this.state.images.length > 0 && !isLoadingMore && (
          <ButtonLoadMore onLoadMore={this.onLoadMore} />
        )}
      </AppStyled>
    );
  }
}

export default App;
