export interface IAppSettings {
  serverUrl: string;
  tokenKey: string;
  userNameKey: string;
}

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
