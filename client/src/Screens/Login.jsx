import React, { useEffect } from 'react'
// import { Button } from 'antd'
// import { BsBoxArrowRight } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

import { loginSchema } from '../Validation/UserValidation'
import InlineError from '../Components/Notifications/InlineError'
import { loginAction } from '../Redux/Actions/UserActions'

import Layout from '../Layout/Layout'
import { UserConstants } from '../Redux/Constants'
import toast from 'react-hot-toast'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isLoading, isError, isSuccess, userInfo } = useSelector(
    state => state.userLogin
  )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  })

  const handleLogin = data => {
    dispatch(loginAction(data))
    // reset({
    //   email: '',
    //   password: ''
    // })
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Welcome back! ' + userInfo?.fullName)
      dispatch({ type: UserConstants.USER_lOGIN_RESET })
    }
    if (isError) {
      toast.error(isError)
      dispatch({ type: UserConstants.USER_lOGIN_RESET })
    }
  }, [isSuccess, navigate, dispatch, userInfo, isError])

  useEffect(() => {
    if (userInfo?.token) {
      if (userInfo.isAdmin) navigate('/dashboard')
      else navigate('/profile')
    }
  }, [userInfo, navigate])
  return (
    <div>
      <Layout>
        <div className='flex justify-center items-center min-h-screen '>
          <div className='w-[90vw] max-w-[500px] h-min min-h-[70vh] bg-dry rounded-md border-gray-500 border p-6  flex flex-col justify-between -translate-y-14 '>
            <div className='flex justify-center items-center  pt-5'>
              <img src='asset/logo1.png' className='h-[40px] block' alt='' />
            </div>
            <form
              action=''
              className='block w-full'
              onSubmit={handleSubmit(handleLogin)}
            >
              <label htmlFor='' className='block'>
                Email
              </label>
              <input
                name='email'
                placeholder='enter your email address'
                {...register('email')}
                className='block w-full h-[50px] mt-2 rounded bg-main p-3 border border-border'
                type='email'
              />
              {errors.email && <InlineError msg={errors.email.message} />}
              <br />
              <label htmlFor='' className='block mt-6' placeholder='********'>
                Password
              </label>
              <input
                name='password'
                {...register('password')}
                className='block w-full h-[50px] mt-2 rounded bg-main p-3 border border-border'
                type='password'
              />
              {errors.password && <InlineError msg={errors.password.message} />}
              <br />
              <br />
              <button
                disabled={isLoading}
                type='submit'
                className=' block w-full h-[50px] flex-cols bg-subMain rounded-md'
              >
                {/* <Button
                  className=' w-full h-[50px]'
                  icon={<BsBoxArrowRight className='-mb-1' size={20} />}
                  type='primary'
                  danger
                > */}
                {isLoading ? 'loading...' : ' Singin'}
                {/* </Button> */}
              </button>
            </form>
            <div className='flex justify-center items-center pb-5'>
              <h1 className='text-sm text-gray-300'>
                You donot have a acount?
              </h1>
              &nbsp;
              <Link to={'/register'}>
                <span className='text-sm font-bold'>Singup</span>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Login
