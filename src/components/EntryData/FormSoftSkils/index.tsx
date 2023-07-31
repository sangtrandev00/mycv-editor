import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input } from 'antd';
import { IInfo } from '../../../types/user.type';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { defaultUser, localUpdateUserInfo, updateUserContactInfo } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';

interface IFormValues {
    name: string;
    email: string;
    phone: string;
    address: string;
    jobTitle: string;
    avatar: string;
    dateOfBirth: DatePickerProps;
}

const SoftSkillsForm: React.FC = () => {

    const currentUser = useSelector((state: RootState) => state.user.user);


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
  
    const defaultDate = dayjs(currentUser.info?.dateOfBirth.toString()).format('YYYY-MM-DD');


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleOnChange",e.target.value);
        console.log("handleOnChange",e.target.name);
   
        const updatedUserInfo = {
            ...currentUser.info,
            [e.target.name]: e.target.value
        }
     
        dispatch(localUpdateUserInfo(updatedUserInfo))

    }


    return (
      <>
      <h3>Form Soft Skills</h3>
      <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          // initialValues={{
          //   website: currentUser.soft?.website || '',
          //   github: currentUser.soft?.github || '',
          //   facebook: currentUser.soft?.facebook || '',
          //   linkedin: currentUser.soft?.linkedin || '',
          // }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Skill 1"
            name="skill"
            rules={[{ required: true, message: 'Please input your skill url!' }]}
          >
            <Input name="skill" onChange={handleOnChange} placeholder='please enter your website url' value={currentUser.links.website} />
          </Form.Item>
      
          <Form.Item
            label="Skill 2"
            name="skill"
            rules={[{ required: true, message: 'Please input your job title' }]}
          >
            <Input name="skill" onChange={handleOnChange} placeholder='please enter your skill' value={currentUser.info.jobTitle}  />
          </Form.Item>
          <Form.Item
            label="Skill 3"
            name="skill3"
            rules={[{ required: true, message: 'Please input your skill3' }]}
          >
            <Input onChange={handleOnChange} placeholder='please enter your skill' value={currentUser.info.avatar} />
          </Form.Item>

          <Form.Item
            label="Skill 4"
            name="skill"
            rules={[{ required: true, message: 'Please input your skill' }]}
          >
            <Input name="skill" onChange={handleOnChange} placeholder='please enter your skill' value={currentUser.info.address}  />
          </Form.Item>
   
      
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-primary">
              Update soft skills
            </Button>
          </Form.Item>
        </Form>
      </>
      )
}

export default SoftSkillsForm;