import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input, notification } from 'antd';
import { IInfo } from '../../../types/user.type';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { defaultUser, localUpdateSocialLinks, localUpdateUserInfo, updateSocialLinks, updateUserContactInfo } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';

interface IFormValues {
  website: string;
  github: string;
  facebook: string;
  linkedin: string;
}

const SocialLinksForm: React.FC = () => {
  const currUserId = useSelector((state: RootState) => state.user.userId);
    const currentUser = useSelector((state: RootState) => state.user.user);


    const asyncDispatch = useAppDispatch();

    const dispatch = useDispatch();

    const onFinish = (formValues: IFormValues) => {
        
        const updatedLinks = {
           website: formValues.website,
           github: formValues.github,
           facebook: formValues.facebook,
           linkedin: formValues.linkedin,
        }

        asyncDispatch(updateSocialLinks({id: currUserId, links: updatedLinks})).unwrap().then((result) => {
            console.log("result: ", result);

            notification.success({
                message: 'Notification',
                description: 'Update Social Links successfully',
                duration: 2
            })
        }).catch((error) => {
            console.log(error);
        });

      };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
          
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleOnChange",e.target.value);
        console.log("handleOnChange",e.target.name);
   
        const updatedSocialLinks = {
            ...currentUser.links,
            [e.target.name]: e.target.value
        }
     
        dispatch(localUpdateSocialLinks(updatedSocialLinks))

    }


    return (
        <>
        <h3>Form Social Links</h3>
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
        </>
      )
}

export default SocialLinksForm;