import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/license-plate-management-keys";

import { LicensePlateManagementTable } from "./components/table-list";
import { WarningDetails } from "./components/warning-details";
import { useAction } from "./hook";

export const LicensePlateManagement = () => {
  const {
    showWarningDetails,
    isRegisteredVehicle,
    setIsRegisteredVehicle,
    setShowWarningDetails,
  } = useAction();

  const { t } = useAuth();

  console.log(Boolean(showWarningDetails));

  return (
    <div
      className={`w-full flex-col justify-start no-scrollbar flex h-full ${
        showWarningDetails ? "" : "bg-white p-4 pb-0"
      }`}
    >
      <span className="text-[1.125rem] font-semibold tracking-tight">
        <span
          className={`mr-2 cursor-pointer ${
            (showWarningDetails || isRegisteredVehicle) && "text-[#5F6279]"
          }`}
          onClick={() => {
            isRegisteredVehicle
              ? setIsRegisteredVehicle(false)
              : setShowWarningDetails(undefined);
          }}
        >
          {t(KEYS.LICENSE_PLATE_MANAGEMENT, { ns: "licensePlateManagement" })}
        </span>

        {(showWarningDetails || isRegisteredVehicle) && (
          <>
            <span className="text-[#5F6279]">/</span>
            <span className="ml-2">
              {t(
                isRegisteredVehicle
                  ? KEYS.REGISTERED_VEHICLES
                  : KEYS.ALERT_DETAILS,
                { ns: "licensePlateManagement" }
              )}
            </span>
          </>
        )}
      </span>
      {showWarningDetails ? (
        <WarningDetails showWarningDetails={showWarningDetails} />
      ) : (
        <LicensePlateManagementTable
          isRegisteredVehicle={isRegisteredVehicle}
          setIsRegisteredVehicle={setIsRegisteredVehicle}
          setShowWarningDetails={setShowWarningDetails}
        />
      )}
    </div>
  );
};
