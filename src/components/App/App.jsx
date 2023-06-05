import { Component } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

import { BoxDiv } from './App.styled';
import { fetchImages } from 'services/imageApi';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';

export class App extends Component {
  state = {
    searchValue: '',
    images: null,
    pageNumber: 1,
    loadMore: false,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue ||
      prevState.pageNumber !== this.state.pageNumber
    ) {
      this.fetchGallery();
    }
  }

  fetchGallery = async () => {
    try {
      const { hits, totalHits } = await fetchImages(
        this.state.pageNumber,
        this.state.searchValue
      );

      if (hits.length === 0) {
        return toast.error(
          "Sorry, images not found... But you can try: 'Apple'"
        );
      }

      this.setState(prevState => ({
        ...prevState,
        images: hits,
        loadMore: hits.length < totalHits,
        isLoading: false,
      }));

      if (totalHits <= 12) {
        toast("Oh, but that's all?! But you can try: 'Car'");
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = async () => {
    try {
      const { searchValue, pageNumber } = this.state;
      this.setState({ isLoading: true });

      const images = await fetchImages(pageNumber, searchValue);

      if (images.hits.length === 0) {
        toast.error('Please try something else');
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          pageNumber: prevState.pageNumber + 1,
          loadMore: images.hits.length < 12 ? false : prevState.loadMore,
        }));
        if (images.hits.length < 12) {
          toast("Oh, but that's all?! But you can try: 'Car'");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSearchSubmit = searchValue => {
    this.setState({
      searchValue,
      images: null,
      pageNumber: 1,
      loadMore: false,
      isLoading: true,
    });
  };

  render() {
    const { images, isLoading, loadMore } = this.state;

    return (
      <BoxDiv>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery images={images} />

        {isLoading && <Loader />}
        {loadMore && <Button onClick={this.onLoadMore} />}

        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </BoxDiv>
    );
  }
}
