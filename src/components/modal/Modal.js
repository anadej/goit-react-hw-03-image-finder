import React, { Component } from "react";
import { ModalContainer } from "./ModalStyled";

class Modal extends Component {
  state = {};
  componentDidMount() {
    window.addEventListener("keydown", this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEsc);
  }

  handleEsc = (e) => {
    if (e.code === "Escape") this.props.toggleModal();
  };

  handleBackdropClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    this.props.toggleModal();
  };

  render() {
    return (
      <ModalContainer onClick={this.handleBackdropClick}>
        <div className="Content">
          <img src={this.props.modalImageURL} alt="" />
        </div>
      </ModalContainer>
    );
  }
}

export default Modal;
