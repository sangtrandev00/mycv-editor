import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input, notification } from 'antd';
import { IInfo } from '../../../types/user.type';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { defaultUser, localUpdateUserInfo, updateUserContactInfo } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';

interface IFormValues {
    name: string;
    email: string;
    phone: string;
    address: string;
    jobTitle: string;
    avatar: string;
    dateOfBirth: DatePickerProps;
}

const ContactInfoForm: React.FC = () => {

  const dateFormat = "DD/MM/YYYY";

  const [form] = useForm();

    const currentUser = useSelector((state: RootState) => state.user.user);

    console.log("currentUser: ", currentUser.info);


    const asyncDispatch = useAppDispatch();

    const dispatch = useDispatch();

    const onFinish = (formValues: IFormValues) => {
        console.log('Success:', formValues);

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

          notification.success({
            message: 'Notification',
            description: 'Update Contact Information successfully',
            duration: 2
          })

          // form.resetFields();

        }).catch((error) => {
            console.log(error);
        });

        
      };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
          
    const onChange: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
        const dateOfBirth = dayjs(dateString).format('DD/MM/YYYY');
        const updatedUserInfo = {
          ...currentUser.info,
          dateOfBirth
      }
   
      dispatch(localUpdateUserInfo(updatedUserInfo))

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
        <h3>Contact Form Info</h3>
          <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            name: currentUser.info?.name || 'name',
            jobTitle: currentUser.info?.jobTitle || 'job title',
            avatar: currentUser.info?.avatar || '',
            address: currentUser.info?.address || '',
            phone: currentUser.info?.phone || '',
            email: currentUser.info?.email || '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input name="name" onChange={handleOnChange} placeholder='please enter your full name' value={currentUser.info.name} />
          </Form.Item>
      
          <Form.Item
            label="Job Title"
            name="jobTitle"
            rules={[{ required: true, message: 'Please input your job title' }]}
          >
            <Input name="jobTitle" onChange={handleOnChange} placeholder='please enter your job title' value={currentUser.info.jobTitle}  />
          </Form.Item>
          <Form.Item
            label="Avatar Url"
            name="avatar"
            rules={[{ required: true, message: 'Please input your avatar' }]}
          >
            <Input onChange={handleOnChange} placeholder='please enter your avatar' value={currentUser.info.avatar} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input your address' }]}
          >
            <Input name="address" onChange={handleOnChange} placeholder='please enter your address' value={currentUser.info.address}  />
          </Form.Item>
          <Form.Item
            label="Birthdate: "
            name="dateOfBirth"
            rules={[{ required: true, message: 'Please input your date of birth number!' }]}
          >
            <DatePicker name="dateOfBirth"   defaultValue={dayjs(currentUser.info?.dateOfBirth.toString(), dateFormat)}  onChange={onChange} />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input name="phone"  onChange={handleOnChange} placeholder="Please enter your phone number" value={currentUser.info.phone}  />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email address!', type: "email" }]}
           
          >
            <Input name="email" onChange={handleOnChange} placeholder="Please enter your email address" value={currentUser.info.email} />
          </Form.Item>
      
      
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-primary">
              Submit
            </Button>
          </Form.Item>
        </Form>
        </>
      )
}

export default ContactInfoForm;