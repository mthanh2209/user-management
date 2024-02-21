import {useState } from 'react';

// CSS
import '@components/DataDisplay/ProfileEditor/ProfileEditor.css';

// Components
import Status from '@components/DataDisplay/Status';
import Button from '@components/Inputs/Button';
import ImageUploader from '@components/Inputs/ImageUploader';
import SwitchStatus from '@components/DataDisplay/SwitchStatus';
import TextArea from '@components/Inputs/TextArea';
import TextField from '@components/Inputs/TextField';
import TextView from '@components/DataDisplay/ProfileEditor/TextView';
import ModalConfirm from '@components/DataDisplay/Modal/ModalConfirm';

// Interfaces
import { IUserProps } from '@types';

// Helpers
import { formatDate } from '@helpers';
import { isEmailValid, isFullNameValid } from '@helpers';

interface IProfileEditor {
  id: number;
  avatar: string;
  fullName: string;
  email: string;
  isActive: boolean;
  registeredDate: string | null;
  lastVisitedDate: string | null;
  details: string;
  bgColor: string;
  onSaveUser: (itemData: IUserProps) => void;
  onDeleteUser: (id: number) => void;
  showToast: (show: boolean, isError: boolean) => void;
}

const ProfileEditor = ({
  id,
  avatar,
  fullName,
  email,
  isActive,
  registeredDate,
  lastVisitedDate,
  details,
  bgColor,
  onSaveUser,
  onDeleteUser,
  showToast
}: IProfileEditor) => {
  const [formData, setFormData] = useState({
    fullName,
    email,
    status: isActive,
    details,
    avatar
  });
  const [isOpenModal, setOpenModal] = useState(false);

  const handleOnChange = (field: string, value: string | boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSwitchChange = () => {
    handleOnChange('status', !formData.status);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailError = isEmailValid(formData.email);
    const fullNameError = isFullNameValid(formData.fullName);

    if (emailError || fullNameError) {
      showToast(true, true);
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
      lastVisitedDate: currentDate,
      details: formData.details,
      bgColor
    };
    onSaveUser(updatedItem as IUserProps);
    showToast(true, false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleDeleteButton = () => {
    setOpenModal(false);
    onDeleteUser(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <div className='confirm-buttons'>
        <Button
          variants='secondary'
          size='sm'
          children='Delete'
          onClick={handleOpenModal}
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
          onDenyText={handleCloseModal}
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
            onChange={(value) => handleOnChange('fullName', value)}
            validate={isFullNameValid}
          />
        </div>

        <div className='form-item form-item-input'>
          <TextField
            isShowLabel={true}
            label='Email'
            additionalClass='input-text'
            value={formData.email}
            onChange={(value) => handleOnChange('email', value)}
            validate={isEmailValid}
          />
        </div>

        <div className='form-item form-item-avatar'>
          <span className='form-item-title'>Avatar</span>
          <ImageUploader
            initialImage={formData.avatar}
            alt={formData.fullName}
            bgColor={bgColor}
            onChange={(value) => handleOnChange('avatar', value)}
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
          content={
            registeredDate === null || registeredDate === undefined
              ? 'Unknown'
              : formatDate(registeredDate)
          }
        />

        <TextView
          label='Last visited'
          content={
            lastVisitedDate === null || lastVisitedDate === undefined
              ? 'Unknown'
              : formatDate(lastVisitedDate)
          }
        />

        <div className='form-item form-item-details'>
          <span className='form-item-title'>Details</span>
          <TextArea
            onChange={(value) => handleOnChange('details', value)}
            value={formData.details}
          />
        </div>
      </form>
    </>
  );
};

export default ProfileEditor;
