import { Empty } from "antd";

export const NotFound = () => {
  return (
    <div className="text-center mt-80">
      <Empty description={false} />
      <h3 className="cursor-pointer">點擊此處返回Camera AI前台</h3>
    </div>
  );
};
