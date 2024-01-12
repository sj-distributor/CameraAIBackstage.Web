import { Button, Modal } from "antd";

export const CustomModal = ({
  title,
  onCancle,
  onConfirm,
  children,
  open,
  className,
  modalWidth,
}: {
  title: JSX.Element;
  onCancle: () => void;
  onConfirm: () => void;
  children: JSX.Element;
  open: boolean;
  className?: string;
  modalWidth?: string;
}) => {
  return (
    <Modal
      className={className ?? ""}
      width={modalWidth ?? undefined}
      title={title}
      open={open}
      centered
      closeIcon={null}
      footer={
        <div className="h-[76px] bg-[#F6F8FC] rounded-b-md items-center flex justify-end">
          <Button className="w-[96px] h-[44px] mr-[16px]" onClick={onCancle}>
            取消
          </Button>
          <Button
            type="primary"
            className="w-[96px] h-[44px] mr-[16px]"
            onClick={onConfirm}
          >
            確定
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  );
};
