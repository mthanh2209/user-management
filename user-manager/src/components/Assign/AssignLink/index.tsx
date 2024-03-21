import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Constants
import { PATH, TYPES } from '@constants';

// Services
import { getRoles } from '@services';

// Stores
import { Context } from '@stores';

export interface IAssignItemLink {
  id?: number;
  name?: string;
}

interface IAssignLink {
  assignTo?: IAssignItemLink[];
}

const AssignLink = ({ assignTo }: IAssignLink) => {
  const { dispatch } = useContext(Context);

  const { data: roles } = getRoles();

  const navigate = useNavigate();

  /**
   * Handles the click event to navigate to the role
   *
   * @param roleId - The ID of the role.
   */
  const handleNavigateToRoleClick = (roleId: number) => () => {
    const roleIndex = roles?.findIndex((role) => role.id === roleId);
    const index = roleIndex !== -1 ? roleIndex + 1 : 0;

    dispatch({
      type: TYPES.SELECTED_ROW,
      payload: { index, data: roles[roleIndex] }
    });

    navigate(PATH.ROLES_PATH);
  };

  return (
    <>
      {assignTo?.map((role) => (
        <>
          <span className='icon-role'></span>
          <a
            key={role.id}
            onClick={handleNavigateToRoleClick(role.id!)}
            className='panel-assign-body-role'
          >
            {role.name}
          </a>
        </>
      ))}
    </>
  );
};

export default AssignLink;
