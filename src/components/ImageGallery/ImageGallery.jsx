import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { fetchImages } from 'services/imageApi';
import { Component } from 'react';

export class ImageGallery extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
  };

  state = {
    images: null,
    pageNumber: 1,
    loadMore: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      try {
        this.setState({
          images: null,
          pageNumber: 1,
          loadMore: false,
          isLoading: true,
        });
        await this.fetchGallery();
      } catch (error) {
        console.log(error);
      }
    }
  }

  fetchGallery = async () => {
    try {
      const searchValue = this.props.value;
      const page = 1;

      const images = await fetchImages(page, searchValue);

      if (images.hits.length === 0) {
        return toast.error(
          "Sorry, images not found... But you can try: 'Apple'"
        );
      }

      if (images.hits.length > 0 && images.totalHits <= 12) {
        this.setState({
          images: images.hits,
        });
        return toast("Oh, but thats's all?! But you can try: 'Car'");
      }

      if (images.hits.length > 0 && images.totalHits > 12) {
        this.setState(prevState => ({
          images: images.hits,
          loadMore: true,
          pageNumber: prevState.pageNumber + 1,
        }));
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = async () => {
    try {
      const searchValue = this.props.value;
      const page = this.state.pageNumber;
      this.setState({ isLoading: true });

      const images = await fetchImages(page, searchValue);

      if (images.hits.length === 0) {
        return toast.error('Please try something else');
      }

      if (images.hits.length < 12) {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          loadMore: false,
          pageNumber: 1,
        }));
        toast("Oh, but that's all?! But you can try: 'Car'");
        return;
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        pageNumber: prevState.pageNumber + 1,
      }));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, loadMore } = this.state;

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
        {loadMore && <Button onClick={this.onLoadMore} />}
      </>
    );
  }
}
