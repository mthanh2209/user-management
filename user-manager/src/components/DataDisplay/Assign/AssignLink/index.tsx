export interface IAssignItemLink {
  id?: number;
  name?: string;
}

interface IAssignLink {
  assignTo?: IAssignItemLink[];
}

const AssignLink = ({ assignTo }: IAssignLink) => {
  return (
    <>
      {assignTo?.map((role) => (
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
    </>
  );
};

export default AssignLink;
