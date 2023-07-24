import { Button, Form, Input, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import {PlusCircleOutlined, MinusCircleOutlined} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../store/store';
import { IUser } from '../../../types/user.type';
import { getUser, updateUser } from '../../../store/user.slice';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const FormData: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrFormDataerCol: { span: 14 } } : null;

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrFormDataerCol: { span: 14, offset: 4 } } : null;

  // Get user info state from global state

  // const {jobTitle, links, info, additionSkills, techSkills} = userInfo;
  


  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise =  dispatch(getUser());
    return () => {
     promise.abort();
    }
  }, [dispatch])

  const userInfo = useSelector((state: RootState) => state.user.user);
  const [formUserData, setFormUserData] = useState<IUser>(userInfo);

  useEffect(() => {
    setFormUserData(userInfo)
  }, [userInfo])

  console.log("formUserData", formUserData);
  console.log("userInfo", userInfo)
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement> ) => {
    console.log(e.target.name);

    let updatedUser = formUserData;

    switch (e.target.name) {
      case "name":
      case "dateOfBirth":
      case "phone":
      case "email":
      case "address":
      case "avatar":
        updatedUser = {
          ...formUserData,
          info: {
            ...formUserData.info,
            [e.target.name]: e.target.value
          }
        }
        break;
      case "jobTitle":
        updatedUser = {
          ...formUserData,
          jobTitle: e.target.value
        }
        break;
      case "website":
      case "github":
      case "linkedin":
      case "facebook":
        updatedUser = {
          ...formUserData,
          links: {
            ...formUserData.links,
            [e.target.name]: e.target.value
          }
        }
        break;
      
      default:
        break;
    }

    setFormUserData(updatedUser)
    // dispatch(updateUser(updatedUser)).then((result) => {
    //   console.log(result);
    // }).catch((error) => {
    //   console.log(error);
    // })
  
  }

  const onFinish = () => {
    console.log('Success:', formUserData);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    className="p-4 bg-white m-4"
      {...formItemLayout}
      layout={"vertical"}
      form={form}
      initialValues={{ layout: formLayout }}
      onValuesChange={onFormLayoutChange}
      style={{ maxWidth: formLayout === 'vertical' ? 'none' : 400 }}
    >
      <Form.Item label="Header"  rules={[{ required: true, message: 'Please input your username!' }]}>
        <Input name="name" value={formUserData.info.name} onChange={handleOnChange} className="mb-2" placeholder="Fill your name here" />
        <Input name="jobTitle" value={formUserData.jobTitle} onChange={handleOnChange} className="mb-2" placeholder="Fill your job title here" />
        <Input name="avatar" value={formUserData.info.avatar}  onChange={handleOnChange} className="mb-2" placeholder="Fill your avatar url here" />
        <Button className="pb-8 mr-2"><PlusCircleOutlined className="" /></Button>
        <Button className="pb-8 mr-2"><MinusCircleOutlined className="" /></Button>
      </Form.Item>
      <Form.Item label="Links">
        <Input className="mb-2" value={formUserData.links.website}  onChange={handleOnChange} name="website"  placeholder="Website" />
        <Input className="mb-2" value={formUserData.links.github}  onChange={handleOnChange} name="github"  placeholder="Github" />
        <Input className="mb-2" value={formUserData.links.facebook}  onChange={handleOnChange} name="facebook"  placeholder="Facebook" />
        <Input className="mb-2" value={formUserData.links.linkedin}  onChange={handleOnChange} name="linkedin"  placeholder="Linkedin" />
          <Button className="pb-8 mr-2"><PlusCircleOutlined className="" /></Button>
          <Button className="pb-8 mr-2"><MinusCircleOutlined className="" /></Button>
      </Form.Item>
      <Form.Item label="Contact Infomation"  rules={[{ required: true, message: 'Please input your username!' }]}>
      <Input className="mb-2" name="" placeholder="Fill your fullname here" />
        <Input className="mb-2" name="" placeholder="Fill your birthday" />
        <Input className="mb-2" name="" placeholder="Fill your phone number" />
        <Input className="mb-2" name="" placeholder="Fill your email" />
        <Input className="mb-2" name="" placeholder="Fill your address" />
        <Button className="pb-8 mr-2"><PlusCircleOutlined className="" /></Button>
        <Button className="pb-8 mr-2"><MinusCircleOutlined className="" /></Button>
      </Form.Item>
      <Form.Item label="Technical Skills">
        <Input className="mb-2" placeholder="Fill your fullname here" />
        <Input className="mb-2" placeholder="Fill your birthday" />
        <Input className="mb-2" placeholder="Fill your phone number" />
        <Input className="mb-2" placeholder="Fill your email" />
        <Input className="mb-2" placeholder="Fill your address" />
        <Button className="pb-8 mr-2"><PlusCircleOutlined className="" /></Button>
          <Button className="pb-8 mr-2"><MinusCircleOutlined className="" /></Button>
      </Form.Item>
   
        <Button type="primary" htmlType='submit' className="text-black border-2 border-gray-200">Submit</Button>
      <Form.Item {...buttonItemLayout}>
      </Form.Item>
    </Form>
  );
};

export default FormData;