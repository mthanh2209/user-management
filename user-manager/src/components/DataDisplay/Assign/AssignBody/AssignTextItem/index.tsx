// Constants
import { AssignmentOptions } from '@constants';

interface IAssignTextItem {
  id: number;
  name: string;
  description?: string;
  isAssigned: boolean;
  isModifying: boolean;
  assignedTo: [
    {
      id: number;
      name: string;
    }
  ];
  selectedType: AssignmentOptions;
  handleItemSelect: (
    id: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
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

            {assignedTo?.map((role) => (
              <>
                <span className='icon-role'></span>
                <a
                  key={role.id}
                  href={`/roles/${role.id}`}
                  className='panel-assign-body-role'
                >
                  {role.name}
                </a>
              </>
            ))}
          </div>
        </>
      ) : (
        <div className='panel-assign-body-item'>
          {isModifying && (
            <input
              type='checkbox'
              checked={isAssigned}
              onChange={handleItemSelect(id)}
              className='panel-assign-checkbox'
            />
          )}
          
          <div className='panel-assign-body-details'>
            <span className='panel-assign-body-name'>{name}</span>
            <p className='panel-assign-body-desc'>{description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignTextItem;
