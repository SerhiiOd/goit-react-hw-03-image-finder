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
    if (prevState.searchValue !== this.state.searchValue) {
      try {
        // this.setState({
        //   images: null,
        //   pageNumber: 1,
        //   loadMore: false,
        //   isLoading: true,
        // });
        await this.fetchGallery();
      } catch (error) {
        console.log(error);
      }
    }
  }

  fetchGallery = async () => {
    try {
      const images = await fetchImages(this.state.page, this.state.searchValue);

      if (images.hits.length === 0) {
        return toast.error(
          "Sorry, images not found... But you can try: 'Apple'"
        );
      }

      const totalHits = images.totalHits;

      this.setState(prevState => ({
        images: images.hits,
        loadMore: images.hits.length < totalHits,
        // pageNumber: prevState.pageNumber + 1,
        isLoading: false,
      }));

      if (totalHits <= 12) {
        toast("Oh, but that's all?! But you can try: 'Car'");
      }
    } catch (error) {
      console.log(error);
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
        return;
      }

      if (images.hits.length < 12) {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          loadMore: false,
          pageNumber: 1,
        }));
        toast("Oh, but that's all?! But you can try: 'Car'");
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          pageNumber: prevState.pageNumber + 1,
        }));
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
    // try {
    //   const searchValue = this.state.searchValue;
    //   const page = this.state.pageNumber;
    //   this.setState({ isLoading: true });

    //   const images = await fetchImages(page, searchValue);

    //   if (images.hits.length === 0) {
    //     return toast.error('Please try something else');
    //   }

    //   if (images.hits.length < 12) {
    //     this.setState(prevState => ({
    //       images: [...prevState.images, ...images.hits],
    //       loadMore: false,
    //       pageNumber: 1,
    //     }));
    //     toast("Oh, but that's all?! But you can try: 'Car'");
    //     return;
    //   }

    //   this.setState(prevState => ({
    //     images: [...prevState.images, ...images.hits],
    //     pageNumber: prevState.pageNumber + 1,
    //   }));
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   this.setState({ isLoading: false });
    // }
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
