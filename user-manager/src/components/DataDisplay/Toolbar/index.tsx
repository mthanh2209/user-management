import { useState } from 'react';

// CSS
import '@components/DataDisplay/Toolbar/Toolbar.css';

// Components
import SearchBar from '@components/Inputs/SearchBar/index';

// Icons
import searchIcon from '@assets/images/search-icon.svg';

interface IToolbar {
  icon?: string;
  content?: string;
  onChange?: (value: string) => void;
  onClose: () => void;
}

const Toolbar = ({
  icon = searchIcon,
  content,
  onChange,
  onClose
}: IToolbar) => {
  const [isOpenSearchBar, setOpenSearchBar] = useState(false);

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true)
  }

  const handleCloseSearchBar = () => {
    setOpenSearchBar(false)
    onClose()
  }

  return (
    <div className='toolbar-wrapper'>
      <p className='toolbar-content'>{content}</p>
      <img
        className='search-icon'
        src={icon}
        alt='icon'
        onClick={handleOpenSearchBar}
      />

      {isOpenSearchBar && (
          <SearchBar
            onChange={onChange}
            onClose={handleCloseSearchBar}
          />
        )}
    </div>
  );
};

export default Toolbar;
