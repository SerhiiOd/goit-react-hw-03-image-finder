import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { ItemGallery, ItemImg } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    largeImageUrl: PropTypes.string.isRequired,
  };

  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    const { url, tag, largeImageUrl } = this.props;

    return (
      <>
        <ItemGallery>
          <ItemImg src={url} alt={tag} onClick={this.toggleModal} />
        </ItemGallery>

        {this.state.showModal && (
          <Modal
            largeImageUrl={largeImageUrl}
            toggleModal={this.toggleModal}
            tag={tag}
          />
        )}
      </>
    );
  }
}
