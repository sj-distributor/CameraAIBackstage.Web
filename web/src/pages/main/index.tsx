import { Outlet } from "react-router-dom";

export const Container = () => {
  return (
    <div className="pt-6 px-6 flex-1 bg-[#F6F8FC]">
      <Outlet />
    </div>
  );
};
