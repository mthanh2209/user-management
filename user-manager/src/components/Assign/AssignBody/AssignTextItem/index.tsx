// Constants
import { AssignmentOptions } from '@constants';

// Components
import AssignLink, {
  IAssignItemLink
} from '@components/Assign/AssignLink';

interface IAssignTextItem {
  id: number;
  name: string;
  description?: string;
  isAssigned: boolean;
  isModifying: boolean;
  assignedTo?: IAssignItemLink[];
  selectedType: AssignmentOptions;
  handleItemSelect: (id: number) => () => void;
}

const AssignTextItem = ({
  id,
  name,
  description,
  isAssigned,
  isModifying,
  assignedTo,
  selectedType,
  handleItemSelect
}: IAssignTextItem) => {
  return (
    <>
      {selectedType === AssignmentOptions.AllAssignment ? (
        <>
          <div className='panel-assign-body-item'>
            <span className='panel-assign-body-name'>{name}</span>
            <p className='panel-assign-body-desc'>{description}</p>
          </div>

          <div className='panel-assign-body-item'>
            {isAssigned && (
              <span className='panel-assign-body-directly'>
                Assigned directly
              </span>
            )}

            <AssignLink assignTo={assignedTo} />
          </div>
        </>
      ) : (
        <div className='panel-assign-body-item item-checkbox'>
          {isModifying && (
            <input
              type='checkbox'
              checked={isAssigned}
              onChange={handleItemSelect(id)}
              className='panel-assign-checkbox'
            />
          )}

          {isModifying || isAssigned ? (
            <div className='panel-assign-body-details'>
              <span className='panel-assign-body-name'>{name}</span>
              <p className='panel-assign-body-desc'>{description}</p>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default AssignTextItem;
