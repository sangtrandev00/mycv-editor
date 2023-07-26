import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from 'antd';
import { IInfo } from '../../../types/user.type';
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

const ProjectsForm: React.FC = () => {
  const { TextArea } = Input;

  const { RangePicker } = DatePicker;

  const dateFormat = 'YYYY/MM/DD';
  const weekFormat = 'MM/DD';
  const monthFormat = 'YYYY/MM';

    const projects = useSelector((state: RootState) => state.user.user.projects);
    const currProjectId = useSelector((state: RootState) => state.user.currProjectId);
    const editingProject = projects.find((project) => project.id === currProjectId);


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


    return (
        <Form
          name="basic"
          labelCol={{ span: 14 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          layout={"vertical"}
          initialValues={{
            projectName: editingProject?.name || '',
            description: editingProject?.desc || '',
            website: editingProject?.website || '',
            members: editingProject?.members || "",
            technologies: editingProject?.technologies || "",
            github: editingProject?.repoLink || ''
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
            <Input name="projectName" onChange={handleOnChange} placeholder='please enter your website url' value={""} />
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
            />
          </Form.Item>

          <Form.Item
            label="website"
            name="website"
            rules={[{ required: true, message: 'Please input your website' }]}
          >
            <Input name="website" onChange={handleOnChange} placeholder='please enter your linkedin' value={""}  />
          </Form.Item>
   
          <Form.Item
            label="Github Repository link"
            name="github"
            rules={[{ required: true, message: 'Please input your github' }]}
          >
            <Input name="github" onChange={handleOnChange} placeholder='please enter your linkedin' value={""}  />
          </Form.Item>
          
          <Form.Item
            label="Number of members"
            name="members"
            rules={[{ required: true, message: 'Please input your members' }]}
          >
           <InputNumber min={1} max={100} defaultValue={editingProject?.members} onChange={inputMemberChangeHandler} />
          </Form.Item>
          <Form.Item
            label="Technologies in use"
            name="technologies"
            rules={[{ required: true, message: 'Please input your technologies in project' }]}
          >
          <Input name="technologies" placeholder='Technologies in your project' />
          </Form.Item>
          
      
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-primary">
              Update Social Links
            </Button>
          </Form.Item>
        </Form>
      )
}

export default ProjectsForm;