import { type ButtonProps, Popconfirm, type PopconfirmProps } from "antd";
import { type ReactNode } from "react";

import KEYS from "../../i18n/language/keys/monitor-configuration-keys";
import { useAuth } from "@/hooks/use-auth";

export interface CustomPopconfirmProps extends Omit<PopconfirmProps, "title"> {
  title?: ReactNode;
  body?: ReactNode;
  confirmLoading?: boolean;
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}

export const CustomPopconfirm = ({
  title,
  body,
  onConfirm,
  confirmLoading,
  okText,
  cancelText,
  okButtonProps,
  cancelButtonProps,
  children,
  ...rest
}: CustomPopconfirmProps) => {
  const { t } = useAuth();

  const source = { ns: "monitorConfiguration" };

  return (
    <Popconfirm
      rootClassName="customPopconfirm"
      placement="top"
      title=""
      onConfirm={onConfirm}
      okButtonProps={{
        style: {
          borderRadius: 8,
          boxShadow: "none",
          height: 32,
          padding: "5px 18px",
          margin: 10,
        },
        loading: confirmLoading,
        ...okButtonProps,
      }}
      cancelButtonProps={{
        style: {
          borderRadius: 8,
          padding: "5px 18px",
          height: 32,
          borderColor: "#2853E3",
          color: "#2853E3",
          marginRight: 10,
        },
        ...cancelButtonProps,
      }}
      okText={okText ?? t(KEYS.CONFIRM, source)}
      cancelText={cancelText ?? t(KEYS.CANCEL, source)}
      description={
        rest.description || (
          <div className="flex flex-col px-6 py-4">
            <div className="text-xl font-semibold text-[#323444] mb-4">
              {title}
            </div>
            <div className="flex flex-col py-4 gap-4 mb-4">{body}</div>
          </div>
        )
      }
      {...rest}
      icon={false}
    >
      {children}
    </Popconfirm>
  );
};
