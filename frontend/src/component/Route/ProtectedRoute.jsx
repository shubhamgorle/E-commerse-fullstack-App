import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.user);
  if (isAuthenticated === false) {
    return navigate("/login")
  }
  else {
    return children
  }
}

export default ProtectedRoute
