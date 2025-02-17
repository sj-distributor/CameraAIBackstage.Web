import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Input,
  Pagination,
  Popover,
  Select,
  Table,
  TableProps,
} from "antd";
import { Trans } from "react-i18next";

import KEYS from "@/i18n/language/keys/team-list-keys";
import USER_LIST_KEYS from "@/i18n/language/keys/user-list-keys";
import { ICameraAiTeamsProps } from "@/services/dtos/team-list";

import { useAction } from "./hook";

export const TeamList = () => {
  const {
    t,
    tableLoading,
    teamList,
    pagInationDto,
    inputField,
    goBackstageLoading,
    updatePaginationDto,
    setInputField,
    handleGoBackstage,
  } = useAction();

  const columns: TableProps<ICameraAiTeamsProps>["columns"] = [
    {
      title: t(KEYS.TEAM_NAME, { ns: "teamList" }),
      dataIndex: "name",
    },
    {
      title: t(KEYS.ENTERPRISE, { ns: "teamList" }),
      dataIndex: "belongCompany",
    },
    {
      title: t(KEYS.TEAM_LEADER, { ns: "teamList" }),
      dataIndex: "leader",
    },
    {
      title: t(KEYS.USER_ID, { ns: "teamList" }),
      dataIndex: "leaderId",
    },
    {
      title: t(KEYS.PHONE, { ns: "teamList" }),
      dataIndex: "phone",
    },
    {
      title: t(KEYS.OPERATION, { ns: "teamList" }),
      render: (record) => {
        return (
          <Popover
            arrow={false}
            placement="bottomLeft"
            className="text-[#2853E3] cursor-pointer ml-[1rem]"
            content={
              <div className="w-[8rem] h-[3.5rem] flex flex-col justify-around">
                <Button
                  type="link"
                  className="cursor-pointer text-[#2853E3]"
                  onClick={() => {
                    const newWindow = window.open(
                      `${window.location.origin}/frontdesk`,
                      "_blank"
                    );

                    if (newWindow) {
                      newWindow.document.write(`
                        <script>
                          sessionStorage.setItem("backstage", "superAdmin");
                          window.location.href = "/frontdesk";
                        </script>
                      `);
                    }

                    localStorage.setItem("currentTeam", JSON.stringify(record));
                  }}
                >
                  {t(KEYS.ENTER_FRONTEND, { ns: "teamList" })}
                </Button>
                <Button
                  type="link"
                  className="cursor-pointer text-[#2853E3]"
                  onClick={() => handleGoBackstage(record)}
                  loading={goBackstageLoading}
                >
                  {t(KEYS.ENTER_BACKSTAGE, { ns: "teamList" })}
                </Button>
              </div>
            }
          >
            {t(KEYS.MORE, { ns: "teamList" })}
            <DownOutlined style={{ fontSize: "0.7rem", marginLeft: "1rem" }} />
          </Popover>
        );
      },
    },
  ];

  return (
    <div className="h-full flex flex-col bg-white px-4 flex-1 pl-[1.6rem]">
      <div className="bg-white w-full flex-col justify-start pt-[1.5rem] overflow-scroll no-scrollbar">
        <span className="text-[1.125rem] font-semibold tracking-tight">
          {t(KEYS.TEAM_LIST, { ns: "teamList" })}
        </span>
      </div>

      <div className="mt-[1.75rem] flex items-center">
        <Select
          className="w-[9.75rem] teamList"
          value={inputField.range}
          options={[
            {
              value: "Keyword",
              label: t(KEYS.ALL, { ns: "teamList" }),
            },
            {
              value: "TeamName",
              label: t(KEYS.TEAM_NAME, { ns: "teamList" }),
            },
            {
              value: "BelongCompany",
              label: t(KEYS.ENTERPRISE, { ns: "teamList" }),
            },
            {
              value: "Leader",
              label: t(KEYS.TEAM_LEADER, { ns: "teamList" }),
            },
            {
              value: "LeaderId",
              label: t(KEYS.USER_ID, { ns: "teamList" }),
            },
            {
              value: "Phone",
              label: t(KEYS.PHONE, { ns: "teamList" }),
            },
          ]}
          onChange={(value) =>
            setInputField({
              value: "",
              range: value,
            })
          }
        />
        <Input
          allowClear
          placeholder={t(KEYS.PLACE_HOLDER, { ns: "teamList" })}
          className="w-[17.5rem] teamList"
          suffix={<SearchOutlined />}
          value={inputField.value}
          onChange={(e) => {
            setInputField((prev) => ({
              ...prev,
              value: e.target.value,
            }));
          }}
        />
      </div>

      <div className="flex flex-col justify-between h-[calc(100vh-18.15rem)] overflow-y-auto no-scrollbar mt-[1rem]">
        <Table
          rowKey={(record) => record.id}
          columns={columns}
          dataSource={teamList.cameraAiTeams}
          pagination={false}
          loading={tableLoading}
          sticky
          scroll={{ x: 1160 }}
        />
      </div>

      <div className="flex justify-between items-center py-[1rem]">
        <div className="text-[#929292]">
          <Trans
            i18nKey={USER_LIST_KEYS.PAGINATION}
            ns="userList"
            values={{ count: teamList.count }}
            components={{
              span: <span className="text-[#2853E3] font-light mx-1" />,
            }}
          />
        </div>
        <Pagination
          current={pagInationDto.PageIndex}
          total={teamList.count}
          pageSize={pagInationDto.PageSize}
          pageSizeOptions={[10, 20, 50]}
          onChange={(page, pageSize) => {
            updatePaginationDto("PageIndex", page);
            updatePaginationDto("PageSize", pageSize);
          }}
          showSizeChanger
          showQuickJumper
        />
      </div>
    </div>
  );
};
