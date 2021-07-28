import React, { Component } from "react";
import { getImagesOnSearch } from "../services/api";
import { AppStyled } from "./AppStyled";
import ButtonLoadMore from "./buttonLoadMore/ButtonLoadMore";
import ImageGallery from "./imageGallery/ImageGallery";
import SearchForm from "./searchbar/SearchForm";
import Loader from "react-loader-spinner";
import Modal from "./modal/Modal";

const getImagesFromApi = async (searchbar, page) => {
  const res = await getImagesOnSearch(searchbar, page);
  return res.data.hits;
};

class App extends Component {
  state = {
    images: [],
    searchbar: "",
    page: 1,
    isLoading: false,
    isLoadingMore: false,
    showModal: false,
    modalImageURL: "",
  };

  // updateLargeImage = (largeImageUrl) => {
  //   this.setState({ modalImageURL: largeImageUrl });
  // };

  handleOpenModal = (largeImageURL) => {
    this.setState({
      modalImageURL: largeImageURL,
      showModal: true,
    });
  };

  toggleModal = (e) => {
    // const imageId = e.target.getAttribute("data-id");
    // console.log(this.state.images.find((image) => image.id === imageId));
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onSearchSubmit = async (searchbar) => {
    this.setState({ isLoading: true });
    const images = await getImagesFromApi(searchbar);

    setTimeout(() => {
      this.setState({
        images: [...images],
        searchbar: searchbar,
        page: 2,
        isLoading: false,
      });
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  onLoadMore = async () => {
    this.setState({ isLoadingMore: true });

    const images = await getImagesFromApi(
      this.state.searchbar,
      this.state.page
    );
    setTimeout(() => {
      this.setState((prev) => ({
        images: [...prev.images, ...images],
        page: prev.page + 1,
        isLoadingMore: false,
      }));
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 1000);
  };

  render() {
    const { isLoading, isLoadingMore, showModal, modalImageURL } = this.state;
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
          handleOpenModal={this.handleOpenModal}
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
