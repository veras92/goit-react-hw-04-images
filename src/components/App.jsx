import React, { Component } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from 'components/Loader';
import LoadMoreBtn from 'components/Button/Button';
import { StyledApp } from './App.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from './services/Api';
import PropTypes from 'prop-types';

const PER_PAGE = 12;

class App extends Component {
  static propTypes = {
    query: PropTypes.string,
  };

  state = {
    query: '',
    queryHits: [],
    totalHits: 0,
    status: 'idle',
    error: null,
    page: 1,
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    const isQueryChanged = prevState.query !== query;
    const isPageChanged = prevState.page !== page;

    if (isPageChanged || isQueryChanged) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { page, query } = this.state;

    this.setState({ isLoading: true });

    try {
      const { hits, totalHits } = await getImages(query, page);

      if (this.state.page !== 1) {
        this.scroll();
      }

      if (totalHits === 0) {
        toast.error(
          `Sorry, there are no images matching your search query. Please try again`
        );
      }

      this.setState(prevState => ({
        queryHits: [...prevState.queryHits, ...hits],
        totalHits,
      }));
    } catch (error) {
      toast.error(`Something went wrong..${error?.message}`);
      this.setState({ error, status: 'rejected' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onSubmitForm = value => {
    this.setState({
      query: value,
      queryHits: [],
      totalHits: 0,
      page: 1,
      error: null,
    });
  };

  handleMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  scroll = () => {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild?.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
  };

  render() {
    const { query, queryHits, status, error, totalHits, isLoading, page } =
      this.state;
    const isLoadMoreVisible =
      queryHits.length < totalHits && page < Math.ceil(totalHits / PER_PAGE);

    return (
      <StyledApp>
        <Searchbar query={query} onSubmitForm={this.onSubmitForm} />
        <ImageGallery queryHits={queryHits}></ImageGallery>
        {isLoading && <Loader />}
        {isLoadMoreVisible && <LoadMoreBtn onClick={this.handleMoreBtnClick} />}
        <ToastContainer autoClose={2000} />
        {status === 'rejected' && <div>{error?.message}</div>}
      </StyledApp>
    );
  }
}

export { App };
