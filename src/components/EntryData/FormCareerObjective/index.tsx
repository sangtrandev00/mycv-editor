import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input, notification } from 'antd';
import { IInfo } from '../../../types/user.type';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { defaultUser, localUpdateCareerObjective, localUpdateUserInfo, updateCareerObjective, updateUserContactInfo } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';

const { TextArea } = Input;
interface IFormValues {
    careerObject: string;
}

const CareerObjectiveForm: React.FC = () => {
  const currUserId = useSelector((state: RootState) => state.user.userId);
    const careerObject = useSelector((state: RootState) => state.user.user.careerObject);

    console.log("carreerObject:", careerObject);

    const asyncDispatch = useAppDispatch();

    const dispatch = useDispatch();

    const onFinish = (formValues: IFormValues) => {
        

        asyncDispatch(updateCareerObjective({id: currUserId, careerObjective: formValues.careerObject})).unwrap().then((result) => {
            console.log("result: ", result);

            notification.success({
              message: 'Notification',
              description: 'Update Career Objective successfully',
              duration: 2
            })
        }).catch((error) => {
            console.log(error);
        });

        
      };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
          
    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(localUpdateCareerObjective(e.target.value))
    };
  

    // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log("handleOnChange",e.target.value);
    //     console.log("handleOnChange",e.target.name);
   
    //     const updatedCareerObject = {
            
    //     }
     
    //     dispatch(localUpdateUserInfo(updatedCareerObject))

    // }


    return (
        <>
        <h3>Career Objective Form</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          layout="vertical"
          initialValues={{
            careerObject: careerObject,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Career Objective"
            name="careerObject"
            rules={[{ required: true, message: 'Please input your Career Objective!' }]}
          >
                    <TextArea
            showCount
            maxLength={1000}
            style={{ height: 400, marginBottom: 24 }}
            value={careerObject}
            onChange={onChange}
            placeholder="Enter your career objective"
          />
          </Form.Item>
      
      
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-primary">
             Update Career Objective
            </Button>
          </Form.Item>
        </Form>
        </>
      )
}

export default CareerObjectiveForm;