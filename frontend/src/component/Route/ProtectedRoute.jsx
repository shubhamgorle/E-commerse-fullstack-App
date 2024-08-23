import { Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
function ProtectedRoute({children}){
  const { isAuthenticated, loading, user} = useSelector(state => state.user);
  if(isAuthenticated === false){
    return <Navigate to='/login'/>
 }else{
   return children;
 }
}
export default ProtectedRoute;



