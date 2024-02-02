import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Form, Input, Select } from "antd";

import { useAuth } from "@/hooks/use-auth";
import KEYS from "@/i18n/language/keys/area-management-keys";

import { IAddAreaModalProps } from "../../props";
import { useAction } from "./hook";

export const AddAreaModal = (props: IAddAreaModalProps) => {
  const { record } = props;

  const {
    regionDataItem,
    form,
    setAreaAddressValue,
    handleRemoveInput,
    handleAddInput,
    handleInputChange,
  } = useAction(record);

  const { t } = useAuth();

  return (
    <Form
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      form={form}
      style={{ maxWidth: 600 }}
      colon={false}
    >
      <Form.Item
        label={t(KEYS.AREA_ADDRESS, { ns: "areaManagement" })}
        name="regionAddress"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input
          placeholder={t(KEYS.PLEASE_INPUT, { ns: "areaManagement" })}
          className="w-[24.9375rem] h-[2.0625rem]"
          onChange={(e) => setAreaAddressValue(e.target.value)}
        />
      </Form.Item>

      <Form.Item
        label={t(KEYS.PRINCIPAL, { ns: "areaManagement" })}
        name="principal"
      >
        <Select
          placeholder={t(KEYS.PLEASE_SELECT, { ns: "areaManagement" })}
          className="!w-[24.9375rem] h-[2.0625rem]"
          // defaultValue={regionDataItem?.principal}
        />
      </Form.Item>

      <Form.Item
        label={t(KEYS.MODAL_AREA_NAME, { ns: "areaManagement" })}
        name="regionAreaNames"
        rules={[{ required: true, message: "Please input!" }]}
      >
        {regionDataItem?.regionAreaNames.map((field, index) => (
          <div className="flex mb-[1.25rem]" key={index}>
            <div className="text-[.875rem] mr-[.625rem]">
              <Input
                placeholder={t(KEYS.ZONE_NAME, { ns: "areaManagement" })}
                className="w-[24.9375rem] h-[2.0625rem]"
                value={field}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
            {index !== 0 && (
              <MinusCircleFilled
                style={{ color: "#F04E4E", fontSize: "1.1rem" }}
                className="mr-[.625rem]"
                onClick={() => handleRemoveInput(index)}
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
