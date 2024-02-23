// Components
import Avatar from '@components/DataDisplay/Avatar';

interface IAssignAvatarTextItem {
  id: number;
  src?: string;
  name: string;
  bgColor?: string;
  isModifying: boolean;
  isAssigned: boolean;
  handleItemChecked: (
    id: number
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AssignAvatarTextItem = ({
  id,
  src,
  name,
  bgColor,
  isModifying,
  isAssigned,
  handleItemChecked
}: IAssignAvatarTextItem) => {
  return (
    <div className='panel-assign-avatar-text'>
      {isModifying && (
        <input
          type='checkbox'
          checked={isAssigned}
          onChange={handleItemChecked(id)}
          className='panel-assign-checkbox'
        />
      )}

      {!isModifying && !isAssigned ? null : (
        <>
          <Avatar
            src={src}
            alt={name}
            bgColor={bgColor}
            size='sm'
            additionalClass='panel-assign-body-avatar'
          />

          <span className='panel-assign-avatar-title'>{name}</span>
        </>
      )}
    </div>
  );
};

export default AssignAvatarTextItem;
