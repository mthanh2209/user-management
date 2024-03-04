import { useEffect, useState } from 'react';

// CSS
import '@components/DataDisplay/EditorRole/EditorRole.css';

// Components
import Button from '@components/Inputs/Button';
import TextField from '@components/Inputs/TextField';
import ColorField from '@components/DataDisplay/EditorRole/ColorField';
import ModalConfirm from '@components/DataDisplay/Modal/ModalConfirm';

// Helpers
import { isFullNameValid } from '@helpers';

// Types
import { IRole } from '@types';

interface IEditorRole {
  id: number;
  name: string;
  bgColor: string;
  onSave: (itemData: IRole) => void;
  onDelete: (id: number) => void;
  showToast: (show: boolean, isError: boolean) => void;
}

const EditorRole = ({
  id,
  name,
  bgColor,
  onSave,
  onDelete,
  showToast
}: IEditorRole) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    name,
    bgColor
  });

  const handleChangeRole = (field: string) => (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const handleDeleteButton = () => {
    setOpenModal(false);
    onDelete(id);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameError = isFullNameValid(formData.name);

    if (nameError) {
      showToast(true, true);
      return;
    }

    const updatedItem = {
      id: id,
      name: formData.name,
      bgColor: formData.bgColor
    };
    onSave(updatedItem as IRole);
    showToast(true, false);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      name,
      bgColor
    }));
  }, [name, bgColor]);

  return (
    <>
      <div className='confirm-buttons'>
        <Button
          variants='secondary'
          size='sm'
          children='Delete'
          onClick={handleToggleModal}
        />
        <Button
          variants='primary'
          size='sm'
          form='form-edit-profile'
          children='Save'
        />
      </div>

      {isOpenModal && (
        <ModalConfirm
          isOpen={isOpenModal}
          modalTitle='Delete'
          modalDesc='Are you sure to delete this role?'
          confirmText='Delete'
          denyText='Cancel'
          onConfirmText={handleDeleteButton}
          onDenyText={handleToggleModal}
        />
      )}

      <form
        id='form-edit-profile'
        className='form-edit-profile'
        onSubmit={handleFormSubmit}
      >
        <div className='form-item form-item-input'>
          <TextField
            isShowLabel={true}
            label='Name'
            additionalClass='input-text'
            value={formData.name}
            onChange={handleChangeRole('name')}
            validate={isFullNameValid}
          />
        </div>

        <div className='form-item form-item-input'>
          <ColorField
            label='Color'
            bgColor={formData.bgColor}
            onChange={handleChangeRole('bgColor')}
          />
        </div>
      </form>
    </>
  );
};

export default EditorRole;
