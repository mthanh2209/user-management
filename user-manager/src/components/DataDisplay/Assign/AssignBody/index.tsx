// CSS
import '@components/DataDisplay/Assign/AssignBody/AssignBody.css';

// Components
import AssignAvatarTextItem from '@components/DataDisplay/Assign/AssignBody/AssignAvatarTextItem';
import AssignTextItem from '@components/DataDisplay/Assign/AssignBody/AssignTextItem';

// Types
import { ItemAssign } from '@types';

// Constants
import { AssignmentOptions } from '@constants';

interface IAssignBody {
  src?: string;
  items: ItemAssign[];
  isModifying: boolean;
  selectedType: AssignmentOptions;
  handleItemSelect: (
    id: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AssignBody = ({
  src,
  items,
  isModifying,
  selectedType,
  handleItemSelect
}: IAssignBody) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} className='panel-assign-body-list'>
          {src || item.bgColor ? (
            <AssignAvatarTextItem
              id={item.id}
              name={item.name}
              bgColor={item.bgColor}
              isModifying={isModifying}
              isAssigned={item.isAssigned}
              handleItemSelect={handleItemSelect}
              src={src}
            />
          ) : (
            <AssignTextItem
              id={item.id}
              name={item.name}
              description={item.description}
              isAssigned={item.isAssigned}
              isModifying={isModifying}
              assignedTo={item.assignedTo}
              selectedType={selectedType}
              handleItemSelect={handleItemSelect}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default AssignBody;
