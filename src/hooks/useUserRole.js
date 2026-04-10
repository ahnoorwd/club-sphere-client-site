import { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../Authprovider/AuthProvider";
import { getUserRole } from "../api/users";

const useUserRole = () => {
  const { user } = use(AuthContext);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      return await getUserRole(user.email);
    },
  });

  return {
    role: data?.role || "member",
    roleLoading: isLoading,
    roleError: isError,
  };
};

export default useUserRole;