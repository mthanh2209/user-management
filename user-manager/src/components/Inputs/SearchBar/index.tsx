// CSS
import '@components/Inputs/SearchBar/SearchBar.css';

// Components
import TextField from '@components/Inputs/TextField';

// Icons
import closeIcon from '@assets/images/close-icon.svg';

interface ISearchBarProps {
  icon?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onClose?: () => void;
}

const SearchBar = ({
  icon = closeIcon,
  placeholder = 'Search',
  onChange,
  onClose
}: ISearchBarProps) => {
  return (
    <div className='search-wrapper'>
      <TextField
        isShowLabel={false}
        additionalClass='input-search'
        placeholder={placeholder}
        onChange={onChange}
      />
      <img
        className='close-icon'
        src={icon}
        alt='icon'
        onClick={onClose}
      />
    </div>
  );
};

export default SearchBar;
