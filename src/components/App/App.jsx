import { Component } from 'react';
import { Toaster } from 'react-hot-toast';

import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';

import { BoxDiv } from './App.styled';

export class App extends Component {
  state = {
    searchValue: '',
  };

  onSearchSubmit = searchValue => {
    this.setState({
      searchValue,
    });
  };

  render() {
    return (
      <BoxDiv>
        <Searchbar onSubmit={this.onSearchSubmit} />
        <ImageGallery value={this.state.searchValue} />

        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </BoxDiv>
    );
  }
}
