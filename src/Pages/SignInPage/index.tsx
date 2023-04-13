import React, {useState} from 'react';
import s from './index.module.sass';
import Button from "../../UI/Button";
import FormInput from "../../UI/FormInput";
import {Link} from "react-router-dom";
import {useForm, Controller} from "react-hook-form";
import {AxiosError} from "axios";
import api from '../../Modules/AuthUser/Api/index';
import {useAuth} from "../../Modules/AuthUser";
import LoadingSpinner from "../../UI/LoadingSpinner";
import Container from "../../UI/Container";

interface FormValues {
  email: string
  password: string
}

const SignInPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const {handleSubmit, control, formState:{errors}, setError} = useForm<FormValues>({
    values: {
      email: '',
      password: '',
    },
    mode: "onChange",
  });
  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try{
      const {data: {user, token}} = await api.auth.login(data)
      auth.setCurrentUser(user)
      auth.setToken(token)
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
    <div className={s.signInPage}>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className={s.title}>Sign In</h2>
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Email is required'},
              pattern: {value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'Should be a valid email address'}
            }}
            render={({field}) => <FormInput label={'Email'} type={'email'} field={field} errorMessage={errors.email?.message}/>}
            name={'email'}
          />
          <Controller
            control={control}
            rules={{
              required: {value: true, message: 'Password is required'}
            }}
            render={({field}) => <FormInput label={'Password'} type={'password'} field={field} errorMessage={errors.password?.message}/>}
            name={'password'}
          />
          <div className={s.control}>
            <Button>Login</Button>
            <Link to={'/signUp'}>Create an account</Link>
          </div>
        </form>
      </Container>
      {isLoading && <LoadingSpinner/>}
    </div>
  );
};

export default SignInPage;