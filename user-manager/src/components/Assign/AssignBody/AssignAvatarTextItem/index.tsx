// Components
import Avatar from '@components/Avatar';

interface IAssignAvatarTextItem {
  id: number;
  src?: string;
  name: string;
  bgColor?: string;
  isModifying: boolean;
  isAssigned: boolean;
  handleItemSelect: (id: number) => () => void;
}

const AssignAvatarTextItem = ({
  id,
  src,
  name,
  bgColor,
  isModifying,
  isAssigned,
  handleItemSelect
}: IAssignAvatarTextItem) => {
  return (
    <div className='panel-assign-avatar-text'>
      {isModifying && (
        <input
          type='checkbox'
          checked={isAssigned}
          onChange={handleItemSelect(id)}
          className='panel-assign-checkbox'
        />
      )}

      {isModifying || isAssigned ? (
        <>
          <Avatar
            src={src}
            alt={name}
            bgColor={bgColor}
            size='sm'
          />

          <span className='panel-assign-avatar-title'>{name}</span>
        </>
      ) : null}
    </div>
  );
};

export default AssignAvatarTextItem;
