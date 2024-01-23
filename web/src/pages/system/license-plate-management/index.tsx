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

  return (
    <div>
      <div className="h-[calc(100vh-5rem)] w-full flex-col justify-start no-scrollbar">
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
          <WarningDetails />
        ) : (
          <LicensePlateManagementTable
            isRegisteredVehicle={isRegisteredVehicle}
            setIsRegisteredVehicle={setIsRegisteredVehicle}
            setShowWarningDetails={setShowWarningDetails}
          />
        )}
      </div>
    </div>
  );
};
