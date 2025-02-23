import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
  const { logout } = useLogout();

  return (
    <div className="mt-auto">
      <LogOut
        className="w-5 h-5 text-neutral-500 cursor-pointer hover:text-neutral-300"
        onClick={logout}
      />
    </div>
  );
};
export default LogoutButton;
