import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Component } from 'react';

export class ImageGallery extends Component {
  static propTypes = {
    images: PropTypes.array,
  };

  state = {
    pageNumber: 1,
    isLoading: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.images !== this.props.images) {
      this.setState({
        pageNumber: 1,
        isLoading: false,
      });
    }
  }

  render() {
    const { images, isLoading } = this.props;

    return (
      <>
        <Gallery className="gallery">
          {images &&
            images.map(image => {
              return (
                <ImageGalleryItem
                  key={image.id}
                  tag={image.tags}
                  url={image.webformatURL}
                  largeImageUrl={image.largeImageURL}
                />
              );
            })}
        </Gallery>
        {isLoading && <Loader />}
      </>
    );
  }
}
