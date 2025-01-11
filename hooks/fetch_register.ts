import { useCallback, useEffect, useState } from "react";
import useFetch from "./_fetch";
import { buildRegisterDeviceURL } from "./_url_builders";
import { Platform } from "react-native";

type DeviceData = {
  token: string;
  os: "ios" | "android" | "web" | "windows" | "macos";
  version: string;
};

const useRegisterDevice = () => {
  const { isError, statusCode, fetchData } = useFetch();
  const [deviceIsRegistered, setDeviceIsRegistered] = useState<boolean | null>(
    null,
  );

  const registerDevice = useCallback(
    (deviceToken: string, token: string) => {
      const url = buildRegisterDeviceURL();
      const data: DeviceData = {
        token: deviceToken,
        os: Platform.OS,
        version: (Platform.Version ?? "").toString(),
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
    if (!statusCode) return;
    setDeviceIsRegistered(200 <= statusCode && statusCode < 300);
  }, [statusCode]);

  return {
    registerDevice,
    isError,
    deviceIsRegistered,
  };
};

export default useRegisterDevice;
