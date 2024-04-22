import { useSelector } from "react-redux";

export default function UserAuth() {
  const { user } = useSelector((state: any) => state.auth);
  
  if (user) {
    const isUser = user?.role === "user";
    return isUser ? true : false
  } else {
    return false;
  }
}
