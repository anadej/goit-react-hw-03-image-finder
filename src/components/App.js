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

  //отслеживаем изменения строки запроса или номера страницы
  // и вызываем функцию подгрузки новых фотографий
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.getImages();
    }
    if (prevState.searchbar !== this.state.searchbar) {
      this.getImages();
    }
  }

  toggleModal = (largeImageURL = "") => {
    this.setState({
      modalImageURL: largeImageURL,
    });
  };

  getImages = () => {
    this.setState({ isLoading: true });
    getImagesOnSearch(this.state.searchbar, this.state.page)
      .then((images) => {
        this.setState((prev) => ({
          images: [...prev.images, ...images],
        }));
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

  //При изменении параметра поиска перезаписываем его в state
  // удаляем предыдущие картинки из images и номер страницы устанавливаем в 1
  onSearchSubmit = (searchbar) => {
    this.setState({ images: [], searchbar, page: 1 });
  };

  //При нажатии на кнопку загрузить больше фото
  // перезаписываем номер страницы в state
  onLoadMore = () => {
    this.setState((prev) => ({
      page: prev.page + 1,
    }));

    // this.setState({ isLoadingMore: true });
    // getImagesOnSearch(this.state.searchbar, this.state.page)
    //   .then((images) => {
    //     this.setState((prev) => ({
    //       images: [...prev.images, ...images],
    //       page: prev.page + 1,
    //     }));
    //   })
    //   .catch((error) => console.log(`error`, error))
    //   .finally(() => {
    //     this.setState({ isLoadingMore: false });
    //     window.scrollTo({
    //       top: document.documentElement.scrollHeight,
    //       behavior: "smooth",
    //     });
    //   });
  };

  processSearchRequest = (images) => {};

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
