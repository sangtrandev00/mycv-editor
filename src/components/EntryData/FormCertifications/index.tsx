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

const CertificationsForm: React.FC = () => {

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
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            website: currentUser.links?.website || '',
            github: currentUser.links?.github || '',
            facebook: currentUser.links?.facebook || '',
            linkedin: currentUser.links?.linkedin || '',
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Website"
            name="website"
            rules={[{ required: true, message: 'Please input your website url!' }]}
          >
            <Input name="website" onChange={handleOnChange} placeholder='please enter your website url' value={currentUser.links.website} />
          </Form.Item>
      
          <Form.Item
            label="Github"
            name="github"
            rules={[{ required: true, message: 'Please input your job title' }]}
          >
            <Input name="github" onChange={handleOnChange} placeholder='please enter your job title' value={currentUser.info.jobTitle}  />
          </Form.Item>
          <Form.Item
            label="facebook Url"
            name="facebook"
            rules={[{ required: true, message: 'Please input your facebook' }]}
          >
            <Input onChange={handleOnChange} placeholder='please enter your facebook' value={currentUser.info.avatar} />
          </Form.Item>

          <Form.Item
            label="linkedin"
            name="linkedin"
            rules={[{ required: true, message: 'Please input your linkedin' }]}
          >
            <Input name="linkedin" onChange={handleOnChange} placeholder='please enter your linkedin' value={currentUser.info.address}  />
          </Form.Item>
   
      
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-primary">
              Update Social Links
            </Button>
          </Form.Item>
        </Form>
      )
}

export default CertificationsForm;