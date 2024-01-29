import { Button, Checkbox, Col, Input, Row } from "antd";
import { Outlet } from "react-router-dom";

export const AddNewPermissions = () => {
  const { TextArea } = Input;

  const onChange = (e: any) => {
    console.log(e);
  };

  return (
    <div>
      <Outlet />
      <div className="h-[20rem]  w-[107rem] bg-white rounded-b-md ">
        <div className="bg-white w-full pr-[1rem] pl-[1.5rem] h-[calc(100vh-10rem)] overflow-auto">
          <div className="font-semibold tracking-tight  pt-[0.5rem]">
            <Button type="text">
              <span className="text-[1rem]">角色列表</span>
            </Button>
            <span className="text-[1rem]">/</span>
            <Button type="text">
              <span className="text-[1rem]">角色列表</span>
            </Button>
          </div>

          <div className="ml-[17rem] mt-[1rem]">
            <span>角色信息</span>

            <div className="border-slate-200 border-solid w-[71.25rem] rounded-xl h-[10.9rem] pr-[15.75rem] border-2 mt-[1rem]">
              <div className="flex justify-center items-center pl-[5.3rem] pt-[2rem]">
                <span className="whitespace-nowrap mr-[1rem]">角色名稱</span>
                <Input
                  placeholder="請輸入"
                  onChange={onChange}
                  className="h-[2.06rem] rounded"
                />
              </div>

              <div className="flex justify-center items-center mb-[2rem] mt-[1.375rem] pl-[5.3rem] ">
                <span className="whitespace-nowrap mr-[1rem]">角色描述</span>
                <TextArea
                  placeholder="請輸入"
                  className="h-[3.375rem] rounded "
                />
              </div>
            </div>
          </div>

          <div className="ml-[17rem] mt-[1.5rem]">
            <div className="">前台功能權限</div>
            <div className="border-slate-200 border-solid w-[71.25rem] rounded-xl h-[16.875rem] pr-[15.75rem] border-2 mt-[1rem] mb-[2rem]">
              <div className="flex flex-col w-[71.25rem] rounded flex pl-[4.9rem] pt-[2rem]">
                <div className="flex justify-row mb-[1rem]">
                  <span className="mr-[2.6rem]"> 可見頁面</span>
                  <span>功能權限</span>
                </div>
                <div>
                  <Checkbox.Group
                    style={{
                      width: "100%",
                    }}
                    className="flex mb-[0.8rem]"
                    // onChange={onChange}
                  >
                    <Col span={200} className="mr-[2rem]">
                      <Checkbox value="首頁">首頁</Checkbox>
                    </Col>
                    <Row>
                      <Checkbox value="切換後台">切換後台</Checkbox>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[0.8rem]">
                    <Row>
                      <Col span={200}>
                        <Checkbox value="實時監控" className="mr-[0.9rem]">
                          實時監控
                        </Checkbox>
                      </Col>
                      <Col span={200}>
                        <Checkbox value="導出">導出</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[0.8rem]">
                    <Row>
                      <Col span={280}>
                        <Checkbox value="視頻回放" className="mr-[0.9rem]">
                          視頻回放
                        </Checkbox>
                      </Col>
                      <Col span={280}>
                        <Checkbox value="導出">導出</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[0.8rem]">
                    <Row>
                      <Row>
                        <Checkbox value="預警列表" className="mr-[0.9rem]">
                          預警列表
                        </Checkbox>
                      </Row>
                      <Col span={200}>
                        <Checkbox value="導出" className="mr-[2rem]">
                          導出
                        </Checkbox>
                      </Col>
                      <Col span={200}>
                        <Checkbox value="查看詳情" className="mr-[0.9rem]">
                          查看詳情
                        </Checkbox>
                      </Col>
                      <Col span={200}>
                        <Checkbox value="標記">標記</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group>
                    <Row>
                      <Col span={200}>
                        <Checkbox value="反饋列表" className="mr-[0.9rem]">
                          反饋列表
                        </Checkbox>
                      </Col>
                      <Col span={200}>
                        <Checkbox value="導出" className="mr-[2rem]">
                          導出
                        </Checkbox>
                      </Col>
                      <Col span={200}>
                        <Checkbox value="查看詳情">查看詳情</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </div>
              </div>
            </div>
          </div>

          <div className="ml-[17rem] mt-[1.5rem]">
            <div>前台功能權限</div>
            <div className="border-slate-200 border-solid w-[71.25rem] rounded-xl h-[26.125rem] pr-[15.75rem] border-2 mt-[1rem]">
              <div className="flex flex-col w-[71.25rem] rounded flex pl-[4.9rem] pt-[2rem]">
                <div className="flex justify-row mb-[1rem]">
                  <span className="mr-[2.6rem]"> 可見頁面</span>
                  <span>功能權限</span>
                </div>
                <div>
                  <Checkbox.Group
                    style={{
                      width: "100%",
                    }}
                    className="flex mb-[1rem]"
                  >
                    <Row>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="用戶列表">用戶列表</Checkbox>
                      </Col>
                      <Col>
                        <Checkbox value="添加用戶" className="mr-[2rem]">
                          添加用戶
                        </Checkbox>
                      </Col>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="批量移除">批量移除</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="用戶列表">用戶列表</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="啟用">啟用</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="停用">停用</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="重置密碼">重置密碼</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="移除">移除</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group
                    style={{
                      width: "100%",
                    }}
                    className="flex mb-[1rem]"
                  >
                    <Row>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="角色權限">角色權限</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="新增角色">新增角色</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="分配">分配</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="編輯">編輯</Checkbox>
                      </Col>
                      <Col span={200}>
                        <Checkbox value="刪除">刪除</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[1rem]">
                    <Row>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="設備列表">設備列表</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="添加設備">添加設備</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="編輯">編輯</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="綁定">綁定</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[1rem]">
                        <Checkbox value="解除綁定">解除綁定</Checkbox>
                      </Col>
                      <Col span={200}>
                        <Checkbox value="刪除">刪除</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[1rem]">
                    <Row>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="設備列表">設備類型</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="添加設備">新增</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="編輯">編輯</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="刪除">刪除</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[1rem]">
                    <Row>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="檢測管理">檢測管理</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="添加設備">新增</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="啟用">啟用</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="關閉">關閉</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="編輯">編輯</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="刪除">刪除</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[1rem]">
                    <Row>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="人像管理">人像管理</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="新增">新增</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="編輯">編輯</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="刪除">刪除</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[1rem]">
                    <Row>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="車牌管理">車牌管理</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[1.2rem]">
                        <Checkbox value="已登記車輛">已登記車輛</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="登記">登記</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="詳情">詳情</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>

                  <Checkbox.Group className="flex mb-[1rem]">
                    <Row>
                      <Col span={200} className="mr-[2rem]">
                        <Checkbox value="區域管理">區域管理</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="新增">新增</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="編輯">編輯</Checkbox>
                      </Col>
                      <Col span={200} className="mr-[3.8rem]">
                        <Checkbox value="刪除">刪除</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[4.75rem] w-[107rem] bg-white flex justify-center">
          <Button className="w-[6rem] h-[2.75rem] mr-[3rem]">取消</Button>
          <Button
            type="primary"
            className="w-[6rem] h-[2.75rem] mr-[1rem] bg-[#2853E3]"
          >
            確定
          </Button>
        </div>
      </div>
    </div>
  );
};
