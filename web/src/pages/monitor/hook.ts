import { useState } from "react";

import { IMonitorDataType } from "./props";

export const useAction = () => {
  const [data, setData] = useState<IMonitorDataType[]>([
    {
      title: "1",
      condition: true,
      warningType: "123",
      notificationObject: "1231",
      operate: "",
    },
    {
      title: "2",
      condition: false,
      warningType: "123323",
      notificationObject: "23232",
      operate: "",
    },
  ]);

  return { data, setData };
};
