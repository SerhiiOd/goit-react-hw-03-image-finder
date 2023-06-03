import PropTypes from 'prop-types';
import { Overlay, ModalBox } from './Modal.styled';
import { Component } from 'react';

export class Modal extends Component {
  static propTypes = {
    tag: PropTypes.string.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyClose);
  }

  onKeyClose = event => {
    if (event.code === 'Escape') {
      this.props.toggleModal();
    }
  };

  onOverlayClick = event => {
    if (event.target === event.currentTarget) {
      return this.props.toggleModal();
    }
  };

  render() {
    const { tag, largeImageUrl } = this.props;

    return (
      <Overlay>
        <ModalBox>
          <img src={largeImageUrl} alt={tag} />
        </ModalBox>
      </Overlay>
    );
  }
}
