import {
  useContext,
  useEffect,
  useState
} from 'react';

// CSS
import '@components/EditorProfile/EditorProfile.css';

// Components
import TextView from '@components/EditorProfile/TextView';
import {
  Button,
  ImageUploader,
  ModalConfirm,
  Status,
  SwitchStatus,
  TextArea,
  TextField
} from '@components';

// Interfaces
import { IUser } from '@types';

// Helpers
import { formatDate } from '@helpers/object';
import { isEmailValid, isFullNameValid } from '@helpers/string';

// Stores
import { Context } from '@stores';

// Constants
import { TOAST_TYPE } from '@constants';

interface IEditorProfile {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  isActive: boolean;
  registeredDate: string | null;
  lastModifiedDate: string | null;
  details: string;
  bgColor: string;
  onSaveUser: (itemData: IUser) => void;
  onDeleteUser: (id: number) => void;
}

const EditorProfile = ({
  id,
  avatar,
  fullName,
  email,
  isActive,
  registeredDate,
  lastModifiedDate,
  details,
  bgColor,
  onSaveUser,
  onDeleteUser
}: IEditorProfile) => {
  const { dispatch } = useContext(Context);

  const [formData, setFormData] = useState({
    fullName,
    email,
    status: isActive,
    details,
    avatar
  });
  const [isOpenModal, setOpenModal] = useState(false);

  const handleOnChange = (field: string) => (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSwitchChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      status: !prevData.status
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const fullNameError = isFullNameValid(formData.fullName);

    if (fullNameError) {
      dispatch({ type: TOAST_TYPE.ERROR });
      return;
    }

    const currentDate = new Date().toString();
    const updatedItem = {
      id: id,
      avatar: formData.avatar,
      fullName: formData.fullName,
      email: formData.email,
      isActive: formData.status,
      registeredDate: registeredDate,
      lastModifiedDate: currentDate,
      details: formData.details,
      bgColor
    };
    onSaveUser(updatedItem as IUser);
  };

  const handleToggleModal = () => {
    setOpenModal(!isOpenModal);
  };

  const handleDeleteButton = () => {
    setOpenModal(false);
    onDeleteUser(id);
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fullName,
      email,
      isActive,
      details,
      avatar
    }));
  }, [fullName, email, isActive, details, avatar]);

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
          modalDesc='Are you sure to delete this user?'
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
            label='Full Name'
            additionalClass='input-text'
            value={formData.fullName}
            onChange={handleOnChange('fullName')}
            validate={isFullNameValid}
          />
        </div>

        <div className='form-item form-item-input'>
          <TextField
            isShowLabel={true}
            label='Email'
            additionalClass='input-text'
            value={formData.email}
            onChange={handleOnChange('email')}
            validate={isEmailValid}
          />
        </div>

        <div className='form-item form-item-avatar'>
          <span className='form-item-title'>Avatar</span>
          <ImageUploader
            initialImage={formData.avatar}
            alt={formData.fullName}
            bgColor={bgColor}
            onChange={handleOnChange('avatar')}
          />
        </div>

        <div className='form-item form-item-status'>
          <span className='form-item-title'>Status</span>
          <SwitchStatus
            isChecked={formData.status}
            onChange={handleSwitchChange}
          />

          <div className='status-wrapper'>
            <Status isActive={formData.status} />
          </div>
        </div>

        <TextView
          label='Registered'
          content={registeredDate ? formatDate(registeredDate) : 'Unknown'}
        />

        <TextView
          label='Last Modified'
          content={lastModifiedDate ? formatDate(lastModifiedDate) : 'Unknown'}
        />

        <div className='form-item form-item-details'>
          <span className='form-item-title'>Details</span>
          <TextArea
            onChange={handleOnChange('details')}
            value={formData.details}
          />
        </div>
      </form>
    </>
  );
};

export default EditorProfile;
