import { Checkbox, Col, Input, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Outlet } from "react-router-dom";

export const AddNewPermissions = () => {
  return (
    <div>
      <Outlet />
      <div className="bg-gray-400">
        <div>
          <div>角色信息</div>
          <div className="w-[71.25rem] rounded h-[14rem]">
            <div className="flex justify-start w-[71.25rem] rounded ">
              <span>角色名稱</span>
              <Input placeholder="請輸入" className="h-[2rem] rounded" />
            </div>
            <div className="flex justify-start">
              <span>角色描述</span>
              <TextArea placeholder="請輸入" />
            </div>
          </div>
        </div>
        <div>
          <div>前台功能權限</div>
          <div className="w-[71.25rem] rounded h-[14rem]">
            <div className="flex justify-start w-[71.25rem] rounded ">
              <span>可見頁面</span>
              <span>功能權限</span>
              <div>
                <div>前台功能權限</div>
                <div className="w-[71.25rem] rounded h-[14rem]">
                  <div className="flex justify-start w-[71.25rem] rounded ">
                    {/* <span>功能權限</span> */}
                    <div>
                      <Checkbox.Group
                        style={{
                          width: "100%",
                        }}
                        // onChange={onChange}
                      >
                        {/* <span>可見頁面</span> */}
                        <Col span={200}>
                          <Checkbox value="首頁">首頁</Checkbox>
                        </Col>
                        <Row>
                          <Checkbox value="切換後台">切換後台</Checkbox>
                        </Row>
                      </Checkbox.Group>
                      <br />
                      <Checkbox.Group>
                        <Row>
                          <Col span={200}>
                            <Checkbox value="實時監控">實時監控</Checkbox>
                          </Col>
                          <Col span={200}>
                            <Checkbox value="導出">導出</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                      <br />
                      <Checkbox.Group>
                        <Row>
                          <Col span={280}>
                            <Checkbox value="視頻回放">視頻回放</Checkbox>
                          </Col>
                          <Col span={280}>
                            <Checkbox value="導出">導出</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                      <br />
                      <Checkbox.Group>
                        <Row>
                          <Row>
                            <Checkbox value="預警列表">預警列表</Checkbox>
                          </Row>
                          <Col span={200}>
                            <Checkbox value="導出">導出</Checkbox>
                          </Col>
                          <Col span={200}>
                            <Checkbox value="查看詳情">查看詳情</Checkbox>
                          </Col>
                          <Col span={200}>
                            <Checkbox value="標記">標記</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
                      <br />
                      <Checkbox.Group>
                        <Row>
                          <Col span={200}>
                            <Checkbox value="反饋列表">反饋列表</Checkbox>
                          </Col>
                          <Col span={200}>
                            <Checkbox value="導出">導出</Checkbox>
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
              {/* <div>
                <Checkbox.Group
                  // options={plainOptions}
                  defaultValue={["首頁"]}
                  // onChange={onChange}
                />
                <br />
                <Checkbox.Group
                  // options={options}
                  defaultValue={["切換後台"]}
                  // onChange={onChange}
                />
                <br />
                <Checkbox.Group
                  // options={optionsWithDisabled}
                  defaultValue={["Apple"]}
                  // onChange={onChange}
                />
              </div> */}
            </div>
            <div className="flex justify-start">
              <span>角色描述</span>

              <TextArea placeholder="請輸入" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
