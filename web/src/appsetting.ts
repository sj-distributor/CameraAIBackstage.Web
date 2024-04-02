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
    })
    .catch(() => {});
};

export default settings as IAppSettings;
