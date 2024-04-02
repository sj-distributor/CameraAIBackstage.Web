import { message } from "antd";

export interface IAppSettings {
  serverUrl: string;
  tokenKey: string;
}
const settings = (window as any).appsettings;

export const InitialAppSetting = async () => {
  await fetch("../../../appsetting.json", {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((res: IAppSettings) => {
      (window as any).appSettings = res;
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      message.error(err);
    });
};

export default settings as IAppSettings;
