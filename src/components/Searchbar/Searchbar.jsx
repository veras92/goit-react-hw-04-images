import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  StyledSearcbar,
  StyledSearchForm,
  StyledSearchFormBtn,
  StyledSearchFormBtnLabel,
  StyledSearchFormInput,
} from './Searchbar.styled';
import { toast } from 'react-toastify';
import { SearchIcon } from './SearchIcon';

const Searchbar = ({ query, onSubmitForm }) => {
  const [inputValue, setInputValue] = useState('');

  const handlerInputValue = e => {
    setInputValue(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    const value = inputValue.toLowerCase().trim();
    if (!value) {
      toast.error('Enter a name for the image');
      return;
    }
    if (query === value) {
      toast.error('Enter a different name for the image');
      return;
    }

    onSubmitForm(value);
  };

  return (
    <StyledSearcbar>
      <StyledSearchForm onSubmit={onSubmit}>
        <StyledSearchFormBtn type="submit">
          <SearchIcon />
          <StyledSearchFormBtnLabel>Search</StyledSearchFormBtnLabel>
        </StyledSearchFormBtn>

        <StyledSearchFormInput
          type="text"
          autoComplete="off"
          onChange={handlerInputValue}
          name="searchInput"
          value={inputValue}
          autoFocus
          placeholder="Search images and photos"
        />
      </StyledSearchForm>
    </StyledSearcbar>
  );
};

Searchbar.propTypes = {
  query: PropTypes.string.isRequired,
  onSubmitForm: PropTypes.func.isRequired,
};

export default Searchbar;
