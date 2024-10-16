import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../context/AppContext";
import * as apiClient from "../api-client";

const SignOutButton = () => {

  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  // mutation：變更操作
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const handleSignOut = () => {
    mutation.mutate(); // 改變登入狀態
  }

  return (
    <div>
      <button
        onClick={handleSignOut}
        className="text-blue-600 px-3 font-bold bg-white hover:bg-gray-100 "
      >
        Sign Out
      </button>
    </div>
  );
}

export default SignOutButton