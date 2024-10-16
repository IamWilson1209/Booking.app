import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

// 全局信息：showToast函數 和 isLoggedIn狀態 
type AppContext = {
  showToast: (message: ToastMessage) => void;
  isLoggedIn: boolean;
};

// 創建一個全局信息Context，型別是AppContext或undefined
const AppContext = createContext<AppContext | undefined>(undefined);

// 建立Context 的 Provider，讓{子組件}能使用 AppContext 提供的全局方法和狀態
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
  // 發送api請求查看token是否有效
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          setToast(toastMessage); // 渲染
        },
        isLoggedIn: !isError, // 渲染
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext); // 輸入型別是AppContext或undefined
  return context as AppContext;
};
