import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Row, Col, Space, Divider } from 'antd';
import SideBar from '../SideBar';
import Awards from '../Awards';
import Projects from '../Projects';

const { Header, Sider, Content } = Layout;

const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className="">
      <Sider className="border-spacing-2" style={{backgroundColor: "#ccc"}}  trigger={null} collapsible collapsed={collapsed} width={400} >
        <div className="demo-logo-vertical" />
        <SideBar/>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content className="cv-editor__content"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
         <Row className="cv-editor__row">
            <Col md={8} className="cv-editor__col cv-editor__col--left">
                <div className="cv-editor__my-info bg-primary w-full h-full text-white ">
                    <div className="my-info">
                        <div className="my-info__heading p-4">
                            <h2 className="my-info__name text-3xl ">Tran Nhat Sang</h2>
                            <h2 className="my-info__title mt-4 text-lg">Web developer</h2>
                        </div>
                        <div className="my-info__contacts">
                            <h3 className="my-info__contacts-title font-bold text-xl bg-dark-primary px-4 py-2">Contact information</h3>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={16} className="cv-editor__col cv-editor__col--right">
                <div className="cv-editor__my-background p-4">
                    <div className="my-background">
                        <div className="my-background__overview ">
                            <h3 className="my-background__overview-title font-bold text-primary text-xl">
                                <Space>
                                    Career Objective
                                </Space>

                                <div className="my-background__overview text-sm text-black font-normal mt-2">
                                    Over 2 years of experience in programming with good communication and quick learning skills Strengths: Front-end technology and Back-end web application developmentProficiency in HTML, CSS, JavaScript
                                </div>
                            </h3>
                        </div>
                        <div className="my-background__education">
                            <div className="education">
                                <h3 className="education__title text-xl font-bold text-primary mt-4">
                                    Education
                                </h3>
                                <Divider className="bg-dark-primary opacity-50 my-4"/>
                                <div className="education__info flex">
                                    <div className="education__info-timeline">
                                    2011/10 – 2014/09
                                    </div>
                                    <div className="education__info-school ml-4">
                                        <div className="education__info-school-name font-bold">
                                            FPT Polytechnic
                                        </div>
                                        <div className="education__info-school-major">
                                            <span>Major: </span> - Web Development
                                        </div>
                                        <div className="education__info-school-level">
                                            <span>Level: </span> - Excellence
                                        </div>
                                        <div className="education__info-school-level">
                                            <span>GPT: </span> - 9.5 (current)
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="award">
                                <h3 className="award__title font-bold text-primary text-2xl mt-4">
                                    Awards
                                </h3>
                                <Divider className="bg-dark-primary opacity-50 my-4"/>
                                <div className="award__info">
                                <Awards/>
                                </div>
                            </div>
                            {/* projects section */}
                            <Projects/>
                        </div>
                    </div>
                </div>
            </Col>
         </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default RootLayout;