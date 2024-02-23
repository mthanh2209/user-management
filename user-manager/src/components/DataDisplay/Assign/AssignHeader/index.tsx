// CSS
import '@components/DataDisplay/Assign/AssignHeader/AssignHeader.css';

// Components
import RadioButton from '@components/DataDisplay/RadioButton';
import TextView from '@components/DataDisplay/EditorProfile/TextView';
import Button from '@components/Inputs/Button';

// Types
import { ItemAssign } from '@types';

// Constants
import {
  AssignmentOptions,
  SingleOptionTypes
} from '@constants';

interface AssignHeaderProp {
  items: ItemAssign[];
  title: string;
  optionName: string;
  isModifying: boolean;
  onModifyClick: () => void;
  selectedType: AssignmentOptions;
  singleOption?: SingleOptionTypes;
  onTypeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AssignHeader = ({
  items,
  title,
  optionName,
  isModifying,
  onModifyClick,
  selectedType,
  singleOption,
  onTypeChange
}: AssignHeaderProp) => {
  const directlyAssignedCount =
    items.filter((item) => item.isAssigned).length || 0;

  const allAssignmentsCount = items.length || 0;

  const data = singleOption
    ? [
        {
          id: singleOption.toLowerCase().replace(' ', '-'),
          name: optionName,
          value: singleOption,
          label: `${singleOption} (${directlyAssignedCount})`,
          isChecked: false,
          onChange: () => {}
        }
      ]
    : [
        {
          id: 'assigned-directly',
          name: optionName,
          value: 'Assigned directly',
          label: `Assigned directly (${directlyAssignedCount})`,
          isChecked: selectedType === AssignmentOptions.AssignDirectly,
          onChange: () => {}
        },
        {
          id: 'all-assignments',
          name: optionName,
          value: 'All assignments',
          label: `All assignments (${allAssignmentsCount})`,
          isChecked: selectedType === AssignmentOptions.AllAssignment,
          onChange: () => {}
        }
      ];

  const showRadioBtnView = data.length > 1;

  const showTextView = !showRadioBtnView && data[0];

  return (
    <div className='panel-assign-header'>
      <div className='panel-assign-header-item'>
        <h2 className='panel-assign-header-title'>{title}</h2>

        {showRadioBtnView &&
          data.map((item) => (
            <RadioButton
              key={item.id}
              id={item.id}
              name={item.name}
              value={item.value}
              label={item.label}
              isChecked={item.isChecked}
              onChange={onTypeChange}
            />
          ))}

        {showTextView && (
          <TextView
            content={`${data[0].value} (${directlyAssignedCount})`}
          />
        )}
      </div>

      <Button
        variants='secondary'
        size='lg'
        additionalClass='panel-assign-header-button'
        children={isModifying ? 'Done' : 'Modify'}
        isDisable={selectedType === AssignmentOptions.AllAssignment}
        onClick={onModifyClick}
      />
    </div>
  );
};

export default AssignHeader;
