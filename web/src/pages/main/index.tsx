import { Outlet } from "react-router-dom";

export const Container = () => {
  return (
    <div className="p-6 flex-1 bg-[#F6F8FC] overflow-hidden">
      <Outlet />
    </div>
  );
};
