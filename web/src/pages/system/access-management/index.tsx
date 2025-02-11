import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Image,
  Input,
  Pagination,
  Popconfirm,
  Select,
  Table,
  TableColumnsType,
} from "antd";
import { Trans } from "react-i18next";

import { CustomModal } from "@/components/custom-modal";

import { useAction } from "./hook";
import { AccessTypeEnum, AccessTypeLabel, IAcccessListProps } from "./props";

export const AccessManagement = () => {
  const {
    paginationDto,
    accessListData,
    addOrUpdateModal,
    mockCamera,
    updatePaginationDto,
    setAddOrUpdateModal,
  } = useAction();

  const column: TableColumnsType<IAcccessListProps> = [
    {
      title: "出入口类型",
      dataIndex: "type",
      render: (value: AccessTypeEnum) => {
        return <div>{AccessTypeLabel[value]}</div>;
      },
    },
    {
      title: "出入口名称",
      dataIndex: "name",
    },
    {
      title: "图片",
      dataIndex: "picture",
      render: (value) => {
        return (
          <Image src={value} style={{ width: "2.69rem", height: "2.63rem" }} />
        );
      },
    },
    {
      title: "备注",
      dataIndex: "remark",
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
    },
    {
      title: "操作",
      render: () => {
        return (
          <div>
            <Button type="link" className="text-[#2853E3]">
              编辑
            </Button>
            <Popconfirm
              title="删除提醒"
              description="是否确认删除？"
              rootClassName="portrait"
            >
              <Button type="link" className="text-[#2853E3]">
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const equipmentOptions = mockCamera.map((region) => ({
    label: <span className="text-[0.875rem] text-[#323444]">区域地址A</span>,
    options: region.cameras.map((camera) => ({
      label: camera.equipmentName,
      value: camera.id,
    })),
  }));

  return (
    <div className="bg-white h-full w-full flex-col p-[1.5rem]">
      <span className="text-[1.125rem] font-semibold tracking-tight">
        出入口管理
      </span>
      <div className="mt-[1.5rem] mb-[1rem] h-[2.5rem] flex items-center">
        <Input
          className="w-[17.5rem] h-[2.5rem]"
          placeholder="搜索车牌号码"
          suffix={
            <SearchOutlined
              style={{
                color: "#5F6279",
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            />
          }
        />
        <Select
          className="mx-[1rem] w-[13.5rem] h-[2.5rem]"
          placeholder="出入口类型"
          allowClear
          options={[
            {
              value: AccessTypeEnum.SafeDoor,
              label: AccessTypeLabel[AccessTypeEnum.SafeDoor],
            },
            {
              value: AccessTypeEnum.RollDoor,
              label: AccessTypeLabel[AccessTypeEnum.RollDoor],
            },
          ]}
        />
        <Button
          type="primary"
          className="w-[6rem] h-[2.75rem] mr-[1rem] bg-[#2853E3] ml-auto flex items-center"
          onClick={() => setAddOrUpdateModal(true)}
        >
          <PlusOutlined />
          <div>新增</div>
        </Button>
      </div>

      <div className="flex flex-col h-[calc(100vh-15rem)] justify-between">
        <div className="h-full overflow-auto no-scrollbar pb-[1.125rem]">
          <Table
            columns={column}
            dataSource={accessListData.data}
            pagination={false}
            rowKey="id"
            sticky={true}
            scroll={{ x: 800 }}
          />
        </div>
        <div className="flex justify-between items-center pt-[1rem]">
          <div className="text-[#929292] text-[.875rem] whitespace-nowrap">
            <Trans
              i18nKey={`共 <span>{{count}}</span> 條`}
              ns="operationLog"
              values={{ count: accessListData.count }}
              components={{
                span: <span className="text-[#2853E3] font-light mx-1" />,
              }}
            />
          </div>
          <Pagination
            current={paginationDto.PageIndex}
            pageSize={paginationDto.PageSize}
            pageSizeOptions={[5, 10, 20]}
            showQuickJumper
            showSizeChanger
            onChange={(page, pageSize) => {
              updatePaginationDto("PageIndex", page);
              updatePaginationDto("PageSize", pageSize);
            }}
          />
        </div>
      </div>

      <CustomModal
        title={<div>添加出入口</div>}
        open={addOrUpdateModal}
        className="customDeviceModal"
        modalWidth="42.5rem"
        onConfirm={() => setAddOrUpdateModal(false)}
        onCancle={() => setAddOrUpdateModal(false)}
      >
        <Form
          colon={false}
          className="max-h-[24.56rem] overflow-y-scroll no-scrollbar"
        >
          <Form.Item label="出入口类型" labelCol={{ span: 4 }}>
            <Select
              placeholder="请选择"
              style={{ width: "25rem" }}
              options={[
                {
                  value: AccessTypeEnum.SafeDoor,
                  label: AccessTypeLabel[AccessTypeEnum.SafeDoor],
                },
                {
                  value: AccessTypeEnum.RollDoor,
                  label: AccessTypeLabel[AccessTypeEnum.RollDoor],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="出入口名称" labelCol={{ span: 4 }}>
            <Input placeholder="请输入" style={{ width: "25rem" }} />
          </Form.Item>
          <Form.Item label="选择设备" labelCol={{ span: 4 }}>
            <Select
              placeholder="请选择"
              popupClassName="accessSelect"
              style={{ width: "25rem" }}
              options={equipmentOptions}
            />
          </Form.Item>
          <Form.Item label="图片" labelCol={{ span: 4 }}>
            <div className="flex w-[25rem]">
              <Image
                src="https://smartiestest.oss-cn-hongkong.aliyuncs.com/20241217/6be331e8-0b6a-4a65-aeb8-e14f70407c33.jpeg?Expires=253402300799&OSSAccessKeyId=LTAI5tEYyDT8YqJBSXaFDtyk&Signature=zhqP7kcVoYACfR7K6rmQkC3sQSk%3D"
                style={{ width: "5rem", height: "5rem" }}
              />
              <Button className="w-[6rem] h-[2rem] mt-auto border-[#2853E3] text-[#2853E3]">
                绘制区域
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="备注" labelCol={{ span: 4 }}>
            <Input.TextArea placeholder="请输入" className="w-[34.95rem]" />
          </Form.Item>
        </Form>
      </CustomModal>
    </div>
  );
};
