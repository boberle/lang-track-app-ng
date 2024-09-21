import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import {
  buildRegisterDeviceURL,
  buildSubmitAssignmentURL,
} from "./_url_builders";
import { Platform } from "react-native";

type DeviceData = {
  token: string;
  os: "ios" | "android" | "web" | "windows" | "macos";
  version: string;
};

const useRegisterDevice = () => {
  const { isLoading, isError, statusCode, fetchData } = useFetch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const registerDevice = useCallback(
    async (deviceToken: string, token: string) => {
      const url = buildRegisterDeviceURL();
      const data: DeviceData = {
        token: deviceToken,
        os: Platform.OS,
        version: Platform.Version.toString(),
      };
      fetchData(url, {
        method: "POST",
        jsonData: data,
        token: token,
      });
    },
    [fetchData],
  );

  useEffect(() => {
    setIsSuccess(statusCode === 200);
  }, [statusCode]);

  return {
    registerDevice,
    isLoading,
    isError,
    isSuccess,
  };
};

export default useRegisterDevice;
