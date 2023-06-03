import { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchValue: '',
  };

  onSearchSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery value={this.state.searchValue} />

        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </>
    );
  }
}
