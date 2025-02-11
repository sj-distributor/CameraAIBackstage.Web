import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import areaManagement from "./language/pages/area-management";
import equipmentList from "./language/pages/equipment-list";
import equipmentType from "./language/pages/equipment-type";
import errorMessage from "./language/pages/error-message";
import homeMenu from "./language/pages/home-menu";
import licensePlateManagement from "./language/pages/license-plate-management";
import monitor from "./language/pages/monitor";
import monitorAdd from "./language/pages/monitor-add";
import monitorConfiguration from "./language/pages/monitor-configuration";
import operationLog from "./language/pages/operation-log";
import portraitList from "./language/pages/portrait-list";
import teamInfo from "./language/pages/team-info";
import teamList from "./language/pages/team-list";
import userList from "./language/pages/user-list";
import userPermissions from "./language/pages/user-permissions";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      operationLog: {
        ...operationLog.en,
      },
      areaManagement: {
        ...areaManagement.en,
      },
      userList: {
        ...userList.en,
      },
      userPermissions: {
        ...userPermissions.en,
      },
      equipmentList: {
        ...equipmentList.en,
      },
      equipmentType: {
        ...equipmentType.en,
      },
      monitor: {
        ...monitor.en,
      },
      monitorAdd: {
        ...monitorAdd.en,
      },
      monitorConfiguration: {
        ...monitorConfiguration.en,
      },
      portraitList: {
        ...portraitList.en,
      },
      licensePlateManagement: {
        ...licensePlateManagement.en,
      },
      homeMenu: {
        ...homeMenu.en,
      },
      errorMessage: {
        ...errorMessage.en,
      },
      teamInfo: { ...teamInfo.en },
      teamList: { ...teamList.en },
    },
    ch: {
      operationLog: {
        ...operationLog.ch,
      },
      areaManagement: {
        ...areaManagement.ch,
      },
      userList: {
        ...userList.ch,
      },
      userPermissions: {
        ...userPermissions.ch,
      },
      equipmentList: {
        ...equipmentList.ch,
      },
      equipmentType: {
        ...equipmentType.ch,
      },
      monitor: {
        ...monitor.ch,
      },
      monitorAdd: {
        ...monitorAdd.ch,
      },
      monitorConfiguration: {
        ...monitorConfiguration.ch,
      },
      portraitList: {
        ...portraitList.ch,
      },
      homeMenu: {
        ...homeMenu.ch,
      },
      licensePlateManagement: {
        ...licensePlateManagement.ch,
      },
      errorMessage: {
        ...errorMessage.ch,
      },
      teamInfo: { ...teamInfo.ch },
      teamList: { ...teamList.ch },
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
