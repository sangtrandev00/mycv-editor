import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from 'antd';
import { IInfo, IProject } from '../../../types/user.type';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { defaultUser, localUpdateUserInfo, updateUserContactInfo } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';

interface IFormValues {
    name: string;
    email: string;
    phone: string;
    address: string;
    jobTitle: string;
    avatar: string;
    dateOfBirth: DatePickerProps;
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

    const projects = useSelector((state: RootState) => state.user.user.projects);
    const currProjectId = useSelector((state: RootState) => state.user.currProjectId);
    // const editingProject = projects.find((project) => project.id === currProjectId);
    const currentEditingProject = useSelector((state: RootState) => state.user.currentEditingProject);
    const [formProjectData, setFormProjectData] = useState(initalProjectData);
    const [currentProject, setCurrentProject] = useState(currentEditingProject);

    const asyncDispatch = useAppDispatch();

    const dispatch = useDispatch();

    const onFinish = (formValues: IFormValues) => {
        const dateOfBirth = dayjs(formValues.dateOfBirth.toString()).format('DD/MM/YYYY');
        
        const newContactInfo = {
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
            address: formValues.address,
            dateOfBirth,
            avatar: formValues.avatar,
            jobTitle: formValues.jobTitle
        }

        console.log("new contact", newContactInfo);


        asyncDispatch(updateUserContactInfo({id: "1", info: newContactInfo})).unwrap().then((result) => {
            console.log("result: ", result);
        }).catch((error) => {
            console.log(error);
        });

        
      };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
          
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const inputDescChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      console.log('Change:', e.target.value);
    };

    useEffect(() => {
      console.log("User effect! Edit project");
     
      setCurrentProject(currentEditingProject);
      setFormProjectData(currentEditingProject as Omit<IProject, "id">);
      // console.log(object)
    }, [currentEditingProject])

    // console.log("currentProject:", currentProject);
    // const defaultDate = dayjs(currentUser.info?.dateOfBirth.toString()).format('YYYY-MM-DD');


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleOnChange",e.target.value);
        console.log("handleOnChange",e.target.name);
   
        // const updatedUserInfo = {
        //     ...currentUser.info,
        //     [e.target.name]: e.target.value
        // }
     
        // dispatch(localUpdateUserInfo(updatedUserInfo))

    }


    const inputMemberChangeHandler = (value: number) => {
      console.log('changed', value);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      console.log(e.target.value);

    }

    return (
      <>
      <h3>Form Projects Heading</h3>
      <Form
          name="basic"
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          layout={"vertical"}
          initialValues={{
            projectName: formProjectData?.name || '',
            description: formProjectData?.desc || '',
            website: formProjectData?.website || '',
            members: formProjectData?.members || "",
            technologies: formProjectData?.technologies || "",
            github: formProjectData?.repoLink || ''
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name Project"
            name="projectName"
            rules={[{ required: true, message: 'Please input your project name' }]}
          >
            <Input onChange={handleInputChange} value={formProjectData?.name} name="projectName" placeholder='please enter your website url'  />
          </Form.Item>
      
          <Form.Item
            label="periodOfProject"
            name="periodOfProject"
            rules={[{ required: true, message: 'Please input your job title' }]}
          >
              <RangePicker
              defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item
            label="Project Description"
            name="description"
            rules={[{ required: true, message: 'Please input your description of project' }]}
          >
           <TextArea
              showCount
              maxLength={100}
              style={{ height: 120, marginBottom: 24 }}
              onChange={inputDescChangeHandler}
              placeholder="description"
              value={formProjectData?.desc}
            />
          </Form.Item>

          <Form.Item
            label="website"
            name="website"
            rules={[{ required: true, message: 'Please input your website' }]}
          >
            <Input onChange={handleInputChange} name="website" value={formProjectData?.website} placeholder='please enter your linkedin'  />
          </Form.Item>
   
          <Form.Item
            label="Github Repository link"
            name="github"
            rules={[{ required: true, message: 'Please input your github' }]}
          >
            <Input onChange={handleInputChange} name="github" value={formProjectData?.repoLink} placeholder='please enter your linkedin'  />
          </Form.Item>
          
          <Form.Item
            label="Number of members"
            name="members"
            rules={[{ required: true, message: 'Please input your members' }]}
          >
           <InputNumber min={1} max={100} defaultValue={formProjectData?.members} onChange={inputMemberChangeHandler} />
          </Form.Item>
          <Form.Item
            label="Technologies in use"
            name="technologies"
            rules={[{ required: true, message: 'Please input your technologies in project' }]}
          >
          <Input onChange={handleInputChange} name="technologies" value={formProjectData?.technologies} placeholder='Technologies in your project' />
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