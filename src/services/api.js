import axios from "axios";

const base_URL =
  "https://pixabay.com/api/?key=22379212-1d76d5c959d3b258038bd5be4";

export const getImagesOnSearch = async (searchbar = "", page = 1) => {
  try {
    return await axios
      .get(
        base_URL +
          `&q=${searchbar}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then((response) => response.data.hits);
  } catch (error) {
    console.log(`error`, error);
  }
};
