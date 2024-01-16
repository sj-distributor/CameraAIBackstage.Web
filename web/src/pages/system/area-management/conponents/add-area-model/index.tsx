import { MinusCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Form, Input, Select } from "antd";

import { IAddAreaModalProps } from "../../props";

export const AddAreaModal = (props: IAddAreaModalProps) => {
  const { handleAddInput, handleRemoveInput, inputFields } = props;

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      colon={false}
    >
      <Form.Item
        label="區域地址"
        name="區域地址"
        rules={[{ required: true, message: "Please input!" }]}
      >
        <Input placeholder="請輸入" className="w-[24.9375rem] h-[2.0625rem]" />
      </Form.Item>

      <Form.Item label="負責人" name="負責人">
        <Select
          placeholder="請選擇"
          className="!w-[24.9375rem] h-[2.0625rem]"
        />
      </Form.Item>

      <Form.Item
        label="區域名稱"
        name="區域名稱"
        rules={[{ required: true, message: "Please input!" }]}
      >
        {inputFields.map((field) => (
          <div className="flex mb-[1.25rem]" key={field.id}>
            <div className="text-[.875rem] mr-[.625rem]">
              <Input
                placeholder="地區名稱"
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
