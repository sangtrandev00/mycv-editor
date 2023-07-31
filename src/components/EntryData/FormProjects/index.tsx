import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, notification } from 'antd';
import { IInfo, IProject } from '../../../types/user.type';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { defaultUser, localUpdateCurrentProject, localUpdateUserInfo, updateProjects, updateUserContactInfo } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

interface IFormValues {
    name: string;
    dateStart: string;
    dateEnd: string;
    desc: string;
    website: string;
    repoLink: string;
    members: number;
    position: string;
    technologies: string;
}

const initalProjectData: Omit<IProject, "id"> = {
    name: '',
    dateStart: '',
    dateEnd: '',
    desc: '',
    website: '',
    repoLink: '',
    members: 0,
    position: '',
    technologies: ""
}

const ProjectsForm: React.FC = () => {
  const { TextArea } = Input;

  const { RangePicker } = DatePicker;

  const dateFormat = 'YYYY/MM/DD';
  const weekFormat = 'MM/DD';
  const monthFormat = 'YYYY/MM';
  const currUserId = useSelector((state: RootState) => state.user.userId);
    // const editingProject = projects.find((project) => project.id === currProjectId);
    const currProjectId = useSelector((state: RootState) => state.user.currProjectId);
    const projects = useSelector((state: RootState) => state.user.user.projects);
    const currentEditingProject = useSelector((state: RootState) => state.user.currentEditingProject);
    const [formProjectData, setFormProjectData] = useState(currentEditingProject);
    const [form] = Form.useForm();

  useEffect(() => {
    console.log("click change project", currentEditingProject);

    const editingProject = projects.find((project) => project.id === currProjectId);
    setFormProjectData(editingProject as IProject);
    form.setFieldsValue(editingProject);
  }, [currProjectId, currentEditingProject, projects])
    const asyncDispatch = useAppDispatch();

    const dispatch = useDispatch();

    const onFinish = (formValues: IFormValues) => {
        
        const updatedCurrentProject = {
            id: currProjectId,
            name: formValues.name,
            dateStart: formValues.dateStart,
            dateEnd: formValues.dateEnd,
            desc: formValues.desc,
            website: formValues.website,
            repoLink: formValues.repoLink,
            members: formValues.members,
            position: formValues.position,
            technologies: formValues.technologies
        }

        console.log("new contact", updatedCurrentProject);
        const updatedProjects = [...projects];
        const exisingProjectIdx = updatedProjects.findIndex((project) => project.id === currProjectId);
        if(exisingProjectIdx >= 0) {
          updatedProjects[exisingProjectIdx] = updatedCurrentProject;
        }

        asyncDispatch(updateProjects({id: currUserId, projects: updatedProjects})).unwrap().then((result) => {
            console.log("result: ", result);

            notification.success({
                message: 'Notification',
                description: 'Update Project successfully',
                duration: 2
            })
        }).catch((error) => {
            console.log(error);
        });

        console.log("reset")

        
      };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const inputDescChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      console.log('Change:', e.target.value);

      const updatedCurrentProject = {
        ...currentEditingProject,
        desc: e.target.value
      }

      dispatch(localUpdateCurrentProject(updatedCurrentProject))

    };

    // useEffect(() => {
    //   console.log("User effect! Edit project");
     
    //   setCurrentProject(currentEditingProject);
    //   setFormProjectData(currentEditingProject as Omit<IProject, "id">);
    //   // console.log(object)
    // }, [currentEditingProject])


    const inputMemberChangeHandler = (value: number) => {
      console.log('changed', value);

      const updatedCurrentProject = {
        ...currentEditingProject,
        members: value
      }

      dispatch(localUpdateCurrentProject(updatedCurrentProject))
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      console.log(e.target.value);

      const updatedCurrentProject = {
        ...currentEditingProject,
        [e.target.name]: e.target.value
      }

      // setFormProjectData(updatedCurrentProject)

      dispatch(localUpdateCurrentProject(updatedCurrentProject));

    }

    console.log(formProjectData);

    return (
      <>
      <h3>Form Projects Heading</h3>
      <Form
      form={form}
          name="basic"
          labelCol={{ span: 16 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          layout={"vertical"}
          initialValues={{
            name: formProjectData?.name || '',
            dateStart: formProjectData?.dateStart || '',
            dateEnd: formProjectData?.dateEnd || '',
            description: formProjectData?.desc || '',
            website: formProjectData?.website || '',
            members: formProjectData?.members || "",
            technologies: formProjectData?.technologies || "",
            repoLink: formProjectData?.repoLink || ''
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name Project"
            name="name"
            rules={[{ required: true, message: 'Please input your project name' }]}
          >
            <Input value={formProjectData.name} onChange={handleInputChange} name="name" placeholder='please enter your project name'  />
          </Form.Item>
      
          <Form.Item
            label="periodOfProject (date start )"
            name="dateStart"
            rules={[{ required: true, message: 'Please input your job title' }]}
          >
              {/* <RangePicker
              defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
              format={dateFormat}
            /> */}
            <Input value={formProjectData.dateStart} className="" onChange={handleInputChange}  name="dateStart" placeholder='please enter your date start project' />
           
          </Form.Item>
          <Form.Item
            label="periodOfProject ( date end )"
            name="dateEnd"
            rules={[{ required: true, message: 'Please input your job title' }]}
          >
              {/* <RangePicker
              defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
              format={dateFormat}
            /> */}
            <Input value={formProjectData.dateEnd} className="" onChange={handleInputChange}  name="dateEnd" placeholder='please enter your date start project' />
           
          </Form.Item>
          <Form.Item
            label="Project Description"
            name="desc"
            rules={[{ required: true, message: 'Please input your description of project' }]}
          >
           <TextArea
              showCount
              maxLength={200}
              style={{ height: 120, marginBottom: 24 }}
              onChange={inputDescChangeHandler}
              placeholder="description"
            />
          </Form.Item>

          <Form.Item
            label="website"
            name="website"
            rules={[{ required: true, message: 'Please input your website' }]}
          >
            <Input value={formProjectData.website} onChange={handleInputChange} name="website" placeholder='please enter your website project'  />
          </Form.Item>
   
          <Form.Item
            label="Github Repository link"
            name="repoLink"
            rules={[{ required: true, message: 'Please input your repoLink' }]}
          >
            <Input value={formProjectData.repoLink} onChange={handleInputChange} name="repoLink" placeholder='please enter your repoLink'  />
          </Form.Item>
          
          <Form.Item
            label="Number of members"
            name="members"
            rules={[{ required: true, message: 'Please input your members' }]}
          >
           <InputNumber  value={formProjectData.members} min={1} max={100} defaultValue={currentEditingProject?.members} onChange={inputMemberChangeHandler} />
          </Form.Item>
          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please input your members' }]}
          >
           <Input name="position" value={currentEditingProject?.position} onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Technologies in use"
            name="technologies"
            rules={[{ required: true, message: 'Please input your technologies in project' }]}
          >
          <Input value={formProjectData.technologies} onChange={handleInputChange} name="technologies" placeholder='Technologies in your project' />
          </Form.Item>
          
      
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-primary">
              Update current project
            </Button>
          </Form.Item>
        </Form>
      </>
      )
}

export default ProjectsForm;