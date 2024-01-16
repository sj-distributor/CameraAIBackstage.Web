import { LicensePlateManagementTable } from "./components/table-list";
import { WarningDetails } from "./components/warning-details";
import { useAction } from "./hook";

export const LicensePlateManagement = () => {
  const { showWarningDetails, setShowWarningDetails } = useAction();

  return (
    <div>
      <div className="h-[calc(100vh-5rem)] w-full flex-col justify-start no-scrollbar">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          車牌管理
        </span>
        {showWarningDetails ? (
          <WarningDetails />
        ) : (
          <LicensePlateManagementTable
            setShowWarningDetails={setShowWarningDetails}
          />
        )}
      </div>
    </div>
  );
};
