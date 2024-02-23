// Components
import AssignItem from '@components/DataDisplay/Assign/AssignItem';

// Constants
import { SingleOptionTypes } from '@constants';

// Types
import { ItemAssign } from '@types';

interface IAssignRole {
  roles: ItemAssign[];
  title: string;
}

const AssignRole = ({ roles, title }: IAssignRole) => {
  return (
    <AssignItem
      items={roles}
      title={title}
      singleOption={SingleOptionTypes.RolesAssigned}
      optionName='role'
    />
  );
};

export default AssignRole;
