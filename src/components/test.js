onSearchSubmit = (searchbar) => {
  this.setState({ images: [], isLoading: true });

  getImagesOnSearch(this.state.searchbar, this.state.page).then((images) => {
    this.setState((prev) => ({
      images: [...prev.images, ...images],
      page: prev.page + 1,
    }));
  });

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
};
