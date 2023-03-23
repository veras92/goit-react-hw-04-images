import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from 'components/Loader';
import LoadMoreBtn from 'components/Button/Button';
import { StyledApp } from './App.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from './services/Api';

const PER_PAGE = 12;

function App() {
  const [query, setQuery] = useState('');
  const [queryHits, setQueryHits] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const { hits, totalHits } = await getImages(query, page);

        if (page !== 1) {
          scroll();
        }

        if (totalHits === 0) {
          toast.error(
            `Sorry, there are no images matching your search query. Please try again`
          );
        }

        setQueryHits(prevQueryHits => [...prevQueryHits, ...hits]);
        setTotalHits(totalHits);
      } catch (error) {
        toast.error(`Something went wrong..${error?.message}`);
        setError(error);
        setStatus('rejected');
      } finally {
        setIsLoading(false);
      }
    };

    const isQueryChanged = query !== '';
    const isPageChanged = page !== 1;

    if (isPageChanged || isQueryChanged) {
      fetchImages();
    }
  }, [query, page]);

  const onSubmitForm = value => {
    setQuery(value);
    setQueryHits([]);
    setTotalHits(0);
    setPage(1);
    setError(null);
  };

  const handleMoreBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const scroll = () => {
    const { height: cardHeight } =
      document
        .querySelector('.gallery')
        ?.firstElementChild?.getBoundingClientRect() ?? {};

    window.scrollBy({
      top: cardHeight * 1.5,
      behavior: 'smooth',
    });
  };

  const isLoadMoreVisible =
    queryHits.length < totalHits && page < Math.ceil(totalHits / PER_PAGE);

  return (
    <StyledApp>
      <Searchbar query={query} onSubmitForm={onSubmitForm} />
      <ImageGallery queryHits={queryHits} />
      {isLoading && <Loader />}
      {isLoadMoreVisible && <LoadMoreBtn onClick={handleMoreBtnClick} />}
      <ToastContainer autoClose={2000} />
      {status === 'rejected' && <div>{error?.message}</div>}
    </StyledApp>
  );
}

export { App };
