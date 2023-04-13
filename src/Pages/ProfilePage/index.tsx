import React, {useState} from 'react';
import s from './index.module.sass';
import Container from "../../UI/Container";
import FormInput from "../../UI/FormInput";
import {useForm, Controller} from "react-hook-form";
import Button from "../../UI/Button";
import {useAuth} from "../../Modules/AuthUser";
import LoadingSpinner from "../../UI/LoadingSpinner";
import api from '../../Modules/AuthUser/Api'

interface FormValues {
  firstName: string,
  lastName: string,
}
const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth()
  const {control, formState:{errors}, handleSubmit} = useForm<FormValues>({
    values: {
      firstName: auth.currentUser?.firstName || '',
      lastName: auth.currentUser?.lastName || '',
    }
  });
  const handleFormSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const {data: user} = await api.auth.updateProfile(data)
      auth.setCurrentUser(user)
    } catch (err) {
      console.log(err)
    }
    setIsLoading(false)
  }
  return (
    <div className={s.profilePage}>
      <Container>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <h2 className={s.title}>Update profile</h2>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'First name is required'},
            }}
            render={({field})=> <FormInput label={'First Name'} field={field} type={'text'} errorMessage={errors.firstName?.message}/>}
            name={'firstName'}
          />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Last name is required'},
            }}
            render={({field})=> <FormInput label={'Last Name'} field={field} type={'text'} errorMessage={errors.lastName?.message}/>}
            name={'lastName'}
          />
          <div className={s.control}>
            <Button>Update</Button>
          </div>
        </form>
      </Container>
      {isLoading && <LoadingSpinner/>}
    </div>
  );
};

export default ProfilePage;