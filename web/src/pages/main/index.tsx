import { Outlet } from "react-router-dom";

export const Container = () => {
  return (
    <div className="mt-6 mx-6 flex-1">
      <Outlet />
    </div>
  );
};
