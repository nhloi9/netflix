import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminRouter = ({ children }) => {
  const navigate = useNavigate()
  const { userInfo } = useSelector(state => state.userLogin)
  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/login')
    }
  }, [userInfo, navigate])
  return children
}

export default AdminRouter
