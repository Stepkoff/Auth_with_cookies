import React, {useState} from 'react';
import {useForm, Controller} from "react-hook-form";
import s from './index.module.sass';
import FormInput from "../../UI/FormInput";
import Button from "../../UI/Button";
import {Link} from "react-router-dom";
import api from '../../Modules/AuthUser/Api/index'
import {useAuth} from "../../Modules/AuthUser";
import {AxiosError} from "axios";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Container from "../../UI/Container";

interface FormValues {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {control, handleSubmit, formState: {errors}, getValues, setError} = useForm<FormValues>({
    values: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })
  const auth = useAuth();
  const handleFormSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try{
      await api.auth.registration({
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password
      });
      const {data: {user, token}} = await api.auth.login({email: data.email, password: data.password})
      auth.setToken(token)
      auth.setCurrentUser(user)

    } catch (e) {
      const error = e as AxiosError<{errors: FormValues}>
      if(error.response?.status === 422) {
        Object.keys(error.response?.data?.errors).forEach((key) => {
          setError(key as keyof FormValues, {
            type: 'manual',
            message: error.response?.data?.errors[key as keyof FormValues]
          })
        })
      }
    }
    setIsLoading(false)
  }
  return (
    <div className={s.signUpPage}>
      <Container>
        <form className={s.SignUpForm} onSubmit={handleSubmit(handleFormSubmit)}>
          <h2 className={s.title}>Sign Up</h2>
          <Controller
            rules={{
              required: {value: true, message: 'First name is required'},
              minLength: {value: 4, message: 'First name should contain at least 4 letters'},
              maxLength: {value: 24, message: 'First name should not be longer then 24 letters'}
            }}
            control={control}
            render={({field}) => <FormInput type={'text'} label={'First name'} field={field} errorMessage={errors.firstName?.message}/>}
            name={'firstName'}
          />
          <Controller
            rules={{
              required: {value: true, message: 'Last name is required'},
              minLength: {value: 4, message: 'Last name should contain at least 4 letters'},
              maxLength: {value: 24, message: 'Last name should not be longer then 24 letters'}
            }}
            control={control}
            render={({field}) => <FormInput type={'text'} label={'Last name'} field={field} errorMessage={errors.lastName?.message}/>}
            name={'lastName'}
          />
          <Controller
            rules={{
              required: {value: true, message: 'Email is required'},
              pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Should be a valid email address'}
            }}
            control={control}
            render={({field}) => <FormInput type={'email'} label={'Email'} field={field} errorMessage={errors.email?.message}/>}
            name={'email'}
          />
          <Controller
            rules={{
              required: {value: true, message: 'Password is required'},
              pattern: {value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&_-]{8,}$/, message: 'Password should be at least 8 characters and include 1 big letter and 1 number'}
            }}
            control={control}
            render={({field}) => <FormInput label={'Password'} type={'password'} field={field} errorMessage={errors.password?.message}/>}
            name={'password'}
          />
          <Controller
            rules={{
              required: {value: true, message: 'Confirm your password please'},
              validate: {value: (value) => (getValues('password') !== value) ? 'Password don\'t match' : undefined}
            }}
            control={control}
            render={({field}) => <FormInput type={'password'} errorMessage={errors.confirmPassword?.message} label={'Confirm password'} field={field}/>}
            name={'confirmPassword'}
          />
          <div className={s.control}>
            <Button>Register</Button>
            <Link to={'/signIn'}>Already have an account</Link>
          </div>
        </form>
      </Container>
      {isLoading && <LoadingSpinner/>}
    </div>
  );
};

export default SignUpPage;