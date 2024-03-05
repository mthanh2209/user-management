import { useState } from 'react';

// CSS
import '@components/Toolbar/Toolbar.css';

// Components
import { SearchBar } from '@components';

interface IToolbar {
  content?: string;
  onChange?: (value: string) => void;
  onClose: () => void;
}

const Toolbar = ({ content, onChange, onClose }: IToolbar) => {
  const [isOpenSearchBar, setOpenSearchBar] = useState(false);

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true);
  };

  const handleCloseSearchBar = () => {
    setOpenSearchBar(false);
    onClose();
  };

  return (
    <div className='toolbar-wrapper'>
      <p className='toolbar-content'>{content}</p>
      <span className='search-icon' onClick={handleOpenSearchBar}></span>

      {isOpenSearchBar && (
        <SearchBar onChange={onChange} onClose={handleCloseSearchBar} />
      )}
    </div>
  );
};

export default Toolbar;
