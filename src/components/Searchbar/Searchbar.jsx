import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-hot-toast';
import {
  Header,
  SearchForm,
  SearchButton,
  SearchInput,
  BtnSpan,
} from './Searchbar.styled';

export class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchValue: '',
  };

  onInputChange = e => {
    this.setState({
      searchValue: e.currentTarget.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { searchValue } = this.state;

    if (searchValue.trim() === '') {
      toast.error('Упссс!!! Картинки не найдены.');
      return;
    }

    this.props.onSubmit(searchValue.trim());
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <Header>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchButton type="submit">
            <BtnSpan>Search</BtnSpan>
          </SearchButton>

          <SearchInput
            autoComplete="off"
            autoFocus
            type="text"
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.onInputChange}
          />
        </SearchForm>
      </Header>
    );
  }
}
