import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);
  if (isAuthenticated) {
    return children
  }
  else {
    return navigate("/login")
  }
}

export default ProtectedRoute
