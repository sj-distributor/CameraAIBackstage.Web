import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Form, Input, Select } from "antd";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/area-management-keys";

import { IAddAreaModalProps } from "../../props";

export const AddAreaModal = (props: IAddAreaModalProps) => {
  const { handleAddInput, handleRemoveInput, inputFields } = props;

  const { t } = useAuth();

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      colon={false}
    >
      <Form.Item
        label={t(KEYS.AREA_ADDRESS, { ns: "areaManagement" })}
        name="區域地址"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
          placeholder={t(KEYS.PLEASE_INPUT, { ns: "areaManagement" })}
          className="w-[24.9375rem] h-[2.0625rem]"
        />
      </Form.Item>

      <Form.Item
        label={t(KEYS.PRINCIPAL, { ns: "areaManagement" })}
        name="負責人"
      >
        <Select
          placeholder={t(KEYS.PLEASE_SELECT, { ns: "areaManagement" })}
          className="!w-[24.9375rem] h-[2.0625rem]"
        />
      </Form.Item>

      <Form.Item
        label={t(KEYS.MODAL_AREA_NAME, { ns: "areaManagement" })}
        name="區域名稱"
        rules={[{ required: true, message: "Please input!" }]}
      >
        {inputFields.map((field) => (
          <div className="flex mb-[1.25rem]" key={field.id}>
            <div className="text-[.875rem] mr-[.625rem]">
              <Input
                placeholder={t(KEYS.ZONE_NAME, { ns: "areaManagement" })}
                className="w-[24.9375rem] h-[2.0625rem]"
              />
            </div>
            {field.id !== 1 && (
              <MinusCircleFilled
                style={{ color: "#F04E4E", fontSize: "1.1rem" }}
                className="mr-[.625rem]"
                onClick={() => handleRemoveInput(field.id)}
              />
            )}
            <PlusCircleFilled
              style={{ color: "#2853E4", fontSize: "1.1rem" }}
              onClick={handleAddInput}
            />
          </div>
        ))}
      </Form.Item>
    </Form>
  );
};
