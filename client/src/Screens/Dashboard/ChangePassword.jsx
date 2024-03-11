import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { passwordSchema } from '../../Validation/UserValidation'
import { changePasswordAction } from '../../Redux/Actions/UserActions'
import toast from 'react-hot-toast'
import { UserConstants } from '../../Redux/Constants'
import InlineError from '../../Components/Notifications/InlineError'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const { isSuccess, isError, isLoading } = useSelector(
    state => state.userChangePassword
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(passwordSchema)
  })

  const handleChangePassword = data => {
    dispatch(changePasswordAction(data))
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('change password successful')
      dispatch({ type: UserConstants.USER_CHANGE_PASSWORD_RESET })
      reset({ oldPassword: '', newPassword: '', confirmPassword: '' })
    }
    if (isError) {
      toast.error(isError)
      dispatch({ type: UserConstants.USER_CHANGE_PASSWORD_RESET })
    }
  }, [isError, isSuccess, dispatch])

  return (
    <Sidebar>
      <form onSubmit={handleSubmit(handleChangePassword)}>
        <div>
          <h1 className='text-lg font-bold'>Change Password</h1>
        </div>
        <br />
        <label htmlFor='' className='block'>
          Previous Password
        </label>
        <input
          className='block w-full h-[50px] mt-2 rounded !bg-main p-3 border border-border'
          type='text'
          {...register('oldPassword')}
        />
        {errors.oldPassword && <InlineError msg={errors.oldPassword.message} />}
        <br />
        <label htmlFor='' className='block'>
          New Password
        </label>
        <input
          className='block w-full h-[50px] mt-2 rounded bg-main p-3 border border-border'
          type='text'
          {...register('newPassword')}
        />
        {errors.newPassword && <InlineError msg={errors.newPassword.message} />}
        <br />
        <label htmlFor='' className='block'>
          Confirm Password
        </label>
        <input
          className='block w-full h-[50px] mt-2 rounded bg-main p-3 border border-border'
          type='text'
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <InlineError msg={errors.confirmPassword.message} />
        )}
        <br />
        <div className=''>
          <Button
            className='!border-border float-right h-[40px]'
            type='text'
            htmlType='submit'
            danger
            disabled={isLoading}
          >
            {isLoading ? 'Changing...' : 'Change Password'}
          </Button>
        </div>
      </form>
    </Sidebar>
  )
}

export default ChangePassword
