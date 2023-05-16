import { useSelector } from "react-redux";
import { selectCurrentToken } from "../redux/Slices/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwtDecode(token);
    const { username } = decoded.UserInfo;

    return { username };
  }

  return { username: "" };
};
export default useAuth;
