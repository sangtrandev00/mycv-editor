import React, { useEffect, useState } from 'react';
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
import Contacts from '../Contacts';
import TechSkills from '../TechSkills';
import AddSkills from '../AddSkills';
import SoftSkills from '../SoftSkills';
import { IUser } from '../../types/user.type';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { getUser } from '../../store/user.slice';
const { Header, Sider, Content } = Layout;


const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>();
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);

  const {id, jobTitle, info, additionSkills, softSkills, techSkills, projects, awards, education, careerObject, languages, links} = user;

  console.log(user);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise =  dispatch(getUser());
    return () => {
     promise.abort();
    }
  }, [dispatch])

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
                        <div className="my-info__heading p-4 text-center">
                            <h2 className="my-info__name text-3xl ">{info.name}</h2>
                            <h2 className="my-info__title mt-4 text-lg">{jobTitle}</h2>
                            <img src={info.avatar} alt="" className="mt-4 mx-auto my-info__img rounded-full w-32 h-32 object-cover" />
                        </div>
                        <div className="my-info__contacts">
                         <Contacts info={info}/>
                        </div>
                        <div className="my-info__tech-skills">
                        <TechSkills/>
                        </div>
                        <div className="my-info__add-skills">
                        <AddSkills addSkills={additionSkills}/>
                        </div>
                        <div className="my-info__soft-skills">
                        <SoftSkills/>
                        </div>
                        <div className="my-info__languages">
                          <div className="languages">
                            <h3 className="languages__title font-bold p-4 text-xl bg-dark-primary">
                            Languages
                            </h3>
                            <p className="languages__list p-4">English, Vietnamese</p>
                          </div>
                        </div>
                        <div className="my-info__certifications">
                          <div className="certifications">
                            <h3 className="certifications__title font-bold p-4 text-xl bg-dark-primary">
                            Certifications
                            </h3>
                            <ul className="certifications__list p-4">
                              <li className="certifications__item mt-2">Toeic 660+</li>
                              <li className="certifications__item mt-2">Certified Web Professional-Web Developer</li>
                            </ul>
                          </div>
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
                                            <span>GPA: </span> - 9.5 (current)
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