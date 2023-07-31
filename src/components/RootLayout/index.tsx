import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  EditOutlined
} from '@ant-design/icons';

import { Layout, Menu, Button, theme, Row, Col, Space, Divider, Tooltip, Skeleton } from 'antd';
import SideBar from '../SideBar';
import Awards from '../Awards';
import Projects from '../Projects';
import Contacts from '../Contacts';
import TechSkills from '../TechSkills';
import AddSkills from '../AddSkills';
import SoftSkills from '../SoftSkills';
import { IUser } from '../../types/user.type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { FormEntryState, getUser, setCurrentUserId, showEntryDrawer, startEditingFormState, toggleEntryDrawer, updateCareerObjective } from '../../store/user.slice';
import Education from '../Education';
import MyLinks from '../MyLinks';
import DrawerEntryData from '../SideBar/Drawer';
import {Link, useLocation, useParams} from "react-router-dom";
const { Header, Sider, Content } = Layout;

const RootLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { userId } = useParams();
  const user = useSelector((state: RootState) => state.user.user);
  const isLoading = useSelector((state: RootState) => state.user.loading);

  const {id, info, additionSkills, softSkills, techSkills, projects, awards, education, careerObject, languages, links, certifications} = user;

  const languagesStr = languages.join(", ");

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const thunkDispatch = useAppDispatch();
  const dispatch = useDispatch();

  useEffect(() => {
    const promise =  thunkDispatch(getUser(userId || "1"));
    dispatch(setCurrentUserId(userId || "1"));
    console.log("init");

    return () => {
     promise.abort();
    }
  }, [thunkDispatch, userId])

  const careerObjectiveClickHandler = () => {
    dispatch(startEditingFormState(FormEntryState.CAREER_OBJECTIVE))
    dispatch(toggleEntryDrawer());
  }

  const educationEditHandler = () => {
    dispatch(startEditingFormState(FormEntryState.EDUCATION))
    dispatch(toggleEntryDrawer());
  }

  const awardsEditHandler = () => {
    dispatch(startEditingFormState(FormEntryState.AWARDS))
    dispatch(toggleEntryDrawer());
  }

  const languagesEditHandler = () => {
    dispatch(startEditingFormState(FormEntryState.LANGUAGES))
    dispatch(toggleEntryDrawer());
  }
  const certificationsEditHandler = () => {
    dispatch(startEditingFormState(FormEntryState.CERTIFICATIONS))
    dispatch(toggleEntryDrawer());
  }

  return (
    <div className="font-arimo container-xl w-[1200px] mx-auto">
     <Row>
     <Layout className="">
      {/* <Sider className="border-spacing-2" style={{backgroundColor: "#ccc"}}  trigger={null} collapsible collapsed={collapsed} width={400} >
        <div className="demo-logo-vertical" />
        <SideBar/>
      </Sider> */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          /> */}

          <DrawerEntryData/>
          <Link to="/admin" className="border-2 p-2 ml-2">Go to Admin page</Link>
        </Header>
        <>
        {isLoading && <Skeleton active={true}/>}
        {!isLoading && 
        (
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
                            <h2 className="my-info__title mt-4 text-lg">{info.jobTitle}</h2>
                            <img src={info.avatar} alt="" className="mt-4 mx-auto my-info__img rounded-full w-32 h-32 object-cover" />
                            <MyLinks links={links}/>

                        </div>
                        <div className="my-info__contacts">
                         <Contacts info={info}/>
                        </div>
                        <div className="my-info__tech-skills">
                        <TechSkills techSkills={techSkills}/>
                        </div>
                        <div className="my-info__add-skills">
                        <AddSkills addSkills={additionSkills}/>
                        </div>
                        <div className="my-info__soft-skills">
                        <SoftSkills softSkills={softSkills}/>
                        </div>
                        <div className="my-info__languages">
                          <div className="languages">
                            <h3 className="languages__title font-bold p-4 text-xl bg-dark-primary">
                            <Space>
                                Languages
                                <EditOutlined onClick={languagesEditHandler} className="peer/career-hover:text-red-500 cursor-pointer text-lg" />
                            </Space>
                            </h3>
                            <p className="languages__list p-4">{languagesStr}</p>
                          </div>
                        </div>
                        <div className="my-info__certifications">
                          <div className="certifications">
                            <h3 className="certifications__title font-bold p-4 text-xl bg-dark-primary">
                            <Space>
                                Certifications
                                <EditOutlined onClick={certificationsEditHandler} className="peer/career-hover:text-red-500 cursor-pointer text-lg" />
                            </Space>
                            </h3>
                            <ul className="certifications__list p-4">
                              {certifications.map((cerItem, index) => {
                                return (
                                  <li key={index} className="certifications__item mt-2">{cerItem}</li>
                                )
                              })}
                              {/* <li className="certifications__item mt-2">Toeic 660+</li>
                              <li className="certifications__item mt-2">Certified Web Professional-Web Developer</li> */}
                            </ul>
                          </div>
                        </div>
                    </div>
                </div>
            </Col>
            <Col md={16} className="cv-editor__col cv-editor__col--right">
                <div className="cv-editor__my-background p-4">
                    <div className="my-background">
                      {/* Overview */}
                        <div className="my-background__overview ">
                            <h3 className="my-background__overview-title font-bold text-primary text-xl">
                                <Space className="">
                                   <div className="peer/career">Career Objective</div>
                                  
                                  <EditOutlined onClick={careerObjectiveClickHandler}  className="peer/career-hover:text-red-500 cursor-pointer text-lg" />
                                </Space>

                                <div className="my-background__overview text-sm text-black font-normal mt-2">
                                  {careerObject}
                                </div>
                               
                            </h3>

                        </div>
                        <div className="my-background__education">
                          {/* Education section */}
                            <div className="education">
                                <h3 className="education__title text-xl font-bold text-primary mt-4">
                                    <Space>Education <EditOutlined onClick={educationEditHandler} className="cursor-pointer text-lg" /></Space>
                                </h3>
                                <Divider className="bg-dark-primary opacity-50 my-4"/>
                                <Education education={education}/>
                            </div>
                            <div className="award">
                                <h3 className="award__title font-bold text-primary text-2xl mt-4">
                                  <Space>
                                    Awards
                                    <EditOutlined onClick={awardsEditHandler} className="peer/career-hover:text-red-500 cursor-pointer text-lg" />
                                  </Space>
                                </h3>
                                <Divider className="bg-dark-primary opacity-50 my-4"/>
                                <div className="award__info">
                                <Awards awards={awards}/>
                                </div>
                            </div>
                            {/* projects section */}
                          <Projects projects={projects}/>
                        </div>
                    </div>
                </div>
            </Col>
         </Row>
        </Content>
        )}
        
        </>
      </Layout>
    </Layout>
     </Row>
    </div>

   
  );
};

export default RootLayout;