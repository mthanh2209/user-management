import { getRandomColor } from "@helpers";

export const mockData = {
  rules: [
    {
      id: 1,
      name: 'CanAdminProjects',
      description: 'Can create projects',
      isAssigned: true,
      isAssignedDirectly: true,
      assignedTo: [
        {
          id: 1,
          name: 'Admin'
        }
      ]
    },
    {
      id: 2,
      name: 'CanEditUsers',
      description: 'Can modify user details and access levels',
      isAssigned: true,
      isAssignedDirectly: true,
      assignedTo: [
        {
          id: 2,
          name: 'Team Lead'
        }
      ]
    }
  ],

  roles: [
    {
      id: 1,
      name: 'Admin',
      bgColor: getRandomColor(),
      isAssigned: true,
      assignedTo: [{ id: 1, name: 'Admin' }]
    },
    {
      id: 2,
      name: 'Team Lead',
      bgColor: getRandomColor(),
      isAssigned: false,
      assignedTo: [{ id: 2, name: 'Admin' }]
    }
  ]
};
