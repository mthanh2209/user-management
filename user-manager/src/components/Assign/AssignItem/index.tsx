import { useMemo, useState } from 'react';

// CSS
import '@components/Assign/AssignItem/AssignItem.css';

// Components
import AssignHeader from '@components/Assign/AssignHeader';
import AssignBody from '@components/Assign/AssignBody';

// Types
import {
  IRoleRule,
  IUserRole,
  IUserRule,
  ItemAssign
} from '@types';

// Hooks
import { useDelayedValue } from '@hooks';

// Constants
import {
  AssignmentOptions,
  SingleOptionTypes
} from '@constants';

interface IAssignItem {
  items: ItemAssign[];
  title: string;
  optionName: string;
  userRules?: IUserRule[];
  userRoles?: IUserRole[];
  roleRules?: IRoleRule[];
  singleOption?: SingleOptionTypes;
  handleItemSelect: (id: number) => () => void;
}

const AssignItem = ({
  items,
  title,
  optionName,
  userRoles,
  userRules,
  roleRules,
  singleOption,
  handleItemSelect
}: IAssignItem) => {
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<AssignmentOptions>(
    AssignmentOptions.AssignDirectly
  );
  const [searchField, setSearchField] = useState('');

  /**
   * Handles the change of assignment type.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value as AssignmentOptions);
    setIsModifying(false);
  };

  /**
   * Handles the click event for modifying assignments.
   */
  const handleModifyClick = () => setIsModifying(!isModifying);

  /**
   * Handles the change event for the search field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchField(event.target.value);

  /**
   * Custom hook for delayed search field value.
   */
  const delaySearchField = useDelayedValue(searchField, 500);

  /**
   * Memoized array of filtered assignment items based on the search field.
   */
  const filteredItems = useMemo(() => {
    return items.filter((item: ItemAssign) =>
      item.name.toLowerCase().includes(delaySearchField.toLowerCase())
    );
  }, [items, delaySearchField]);

  return (
    <>
      <AssignHeader
        items={items}
        title={title}
        optionName={optionName}
        isModifying={isModifying}
        userRules={userRules}
        userRoles={userRoles}
        roleRules={roleRules}
        onModifyClick={handleModifyClick}
        selectedType={selectedType}
        singleOption={singleOption}
        onTypeChange={handleTypeChange}
      />

      <div className='assign-input-wrapper'>
        <input
          type='text'
          className='text-field input-search'
          placeholder='Search'
          value={searchField}
          onChange={handleSearchChange}
        />
      </div>

      <AssignBody
        items={filteredItems}
        isModifying={isModifying}
        selectedType={selectedType}
        handleItemSelect={handleItemSelect}
      />
    </>
  );
};

export default AssignItem;
