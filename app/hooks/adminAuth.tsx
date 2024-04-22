import { useSelector } from "react-redux";

export default function AdminAuth() {
  const { user } = useSelector((state: any) => state.auth);

  if (user) {
    const isUser = user?.role === "admin";
    return isUser ? true : false
  } else {
    return false;
  }
}
