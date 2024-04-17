import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { currentUser, getCurrentUser, loadingCurrentUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
    if (!currentUser) {
      router.push("/login");
    }
  }, [loadingCurrentUser]);

  return <>{children}</>;
};

export default ProtectedRoute;
