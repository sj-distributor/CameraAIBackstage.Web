import { Breadcrumb, Button, Checkbox, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

import KEYS from "@/i18n/language/keys/user-permissions-keys";

import { useAction } from "./hook";

export const NewOrUpdatePermissions = () => {
  const {
    handleCheckBox,
    frontendOptionsList,
    backendOptionsList,
    navigate,
    t,
    source,
    language,
  } = useAction();

  return (
    <div className="h-[20rem] bg-white rounded-b-md">
      <Breadcrumb
        items={[
          {
            title: (
              <div onClick={() => navigate("/user/permissions")}>
                {t(KEYS.ROLE_LIST, source)}
              </div>
            ),
          },
          {
            title: t(KEYS.ADD_ROLE, source),
          },
        ]}
        className="text-[1.125rem] font-semibold ml-[1.5rem] pt-[2rem] "
      />
      <div className="bg-white w-full h-[calc(100vh-13.5rem)] overflow-auto no-scrollbar">
        <div className="ml-[17rem] mt-[1rem]">
          <span className="font-medium">
            {t(KEYS.ROLE_INFORMATION, source)}
          </span>
          <div className="border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl h-[10.9rem] border-2 mt-[1rem]">
            <div
              className={`flex  pt-[2rem] ${
                language === "en" ? "pl-[6.7rem]" : "pl-[5.3rem]"
              }`}
            >
              <div className="mt-[.1rem] mr-1 text-[#F04E4E] text-[1rem]">
                *
              </div>
              <div>{t(KEYS.ROLE_NAME, source)}</div>
              <Input
                placeholder={t(KEYS.PLEASE_ENTER, source)}
                className="h-[2rem] w-[48rem] ml-[.5625rem]"
              />
            </div>
            <div className="flex mb-[2rem] pl-[5.3rem] mt-[1.5rem]">
              <div className="mt-[.1rem] mr-1 text-[#F04E4E] text-[1rem]">
                *
              </div>
              <div>{t(KEYS.ROLE_DESCRIBE, source)}</div>
              <div className="max-h-[5rem]">
                <TextArea
                  placeholder={t(KEYS.PLEASE_ENTER, source)}
                  className="h-[2.06rem] w-[48rem] ml-[.5625rem] overflow-auto max-h-[100%]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[17rem] mt-[1rem]">
          <div className="font-medium">
            {t(KEYS.FRONT_DESK_FUNCTION_PERMISSIONS, source)}
          </div>
          <div className="border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl h-[15rem] pr-[15.75rem] border-2 mt-[1rem] mb-[1rem]">
            <div className="flex flex-col w-[71.25rem] rounded pl-[4.9rem] pt-[1rem]">
              <div className="flex justify-row mb-[1rem]">
                <span
                  className={`${
                    language === "en" ? "w-[12rem]" : "w-[8rem]"
                  } font-medium`}
                >
                  {t(KEYS.VISIBLE_PAGES, source)}
                </span>
                <span className="font-medium">
                  {t(KEYS.FUNCTION_PERMISSIONS, source)}
                </span>
              </div>
              <div className="flex flex-col">
                {frontendOptionsList.map((item, index) => (
                  <div className="flex flex-row mb-[0.8rem]" key={index}>
                    {item.option.map((option) => (
                      <Checkbox
                        className={`${
                          language === "en" ? "w-[12rem]" : "w-[8rem]"
                        } `}
                        key={item.optionName}
                        value={item.option}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ml-[17rem] mt-[1rem]">
          <div className="font-medium">
            {t(KEYS.BACKGROUND_FUNCTION_PERMISSIONS, source)}
          </div>
          <div className="border-slate-100 border-solid shadow-lg shadow-slate-200 w-[71.25rem] rounded-xl h-[24rem] pr-[15.75rem] border-2 mt-[1rem]">
            <div className="flex flex-col w-[71.25rem] rounded pl-[4.9rem] pt-[2rem]">
              <div className="flex justify-row mb-[1.2rem]">
                <span className="w-[8rem] font-medium">
                  {t(KEYS.VISIBLE_PAGES, source)}
                </span>
                <span className="font-medium">
                  {t(KEYS.FUNCTION_PERMISSIONS, source)}
                </span>
              </div>
              <div className="flex flex-col">
                {backendOptionsList.map((items, index) => (
                  <div className="flex flex-row mb-[0.8rem]" key={index}>
                    {items.option.map((option) => (
                      <Checkbox
                        className={`${
                          language === "en" ? "w-[12rem]" : "w-[8rem]"
                        } `}
                        key={index}
                        value={items.option}
                        onChange={handleCheckBox}
                      >
                        {option.label}
                      </Checkbox>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[6rem] bg-white flex justify-center pt-[1rem] shadow-[0_4px_25px_-0_rgba(68,68,71,0.15)]">
        <Button
          className="w-[5rem] h-[2.5rem] mr-[3rem]"
          onClick={() => navigate("/user/permissions")}
        >
          {t(KEYS.CANCEL, source)}
        </Button>
        <Button
          type="primary"
          className="w-[5rem] h-[2.5rem] mr-[1rem] bg-[#2853E3]"
        >
          {t(KEYS.CONFIRM, source)}
        </Button>
      </div>
    </div>
  );
};
