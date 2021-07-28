import React from "react";
import { ButtonLoadMoreStyled } from "./ButtonLoadMoreStyled";

const ButtonLoadMore = ({ onLoadMore }) => {
  return (
    <ButtonLoadMoreStyled>
      <button type="button" className="LoadMore-button" onClick={onLoadMore}>
        Load more
      </button>
    </ButtonLoadMoreStyled>
  );
};

export default ButtonLoadMore;
