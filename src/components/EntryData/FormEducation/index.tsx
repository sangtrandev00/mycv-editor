import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { defaultUser, localUpdateUserInfo, updateUserContactInfo, updateUserEducation } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { IEducation } from '../../../types/user.type';

const { RangePicker } = DatePicker;

interface IFormValues {
    schoolName: string;
    major: string;
    level: string;
    gpa: number;
    periodOfStudy: DatePickerProps[];
}

const EducationForm: React.FC = () => {
    const dateFormat = 'YYYY/MM/DD';
    const weekFormat = 'MM/DD';
    const monthFormat = 'YYYY/MM';

    const educationBg = useSelector((state: RootState) => state.user.user.education);

    console.log("education bg: ", educationBg);

    const asyncDispatch = useAppDispatch();

    const dispatch = useDispatch();

    const onFinish = (formValues: IFormValues) => {
        const timeStart = dayjs(formValues.periodOfStudy[0].toString()).format('DD/MM/YYYY');
        const timeEnd = dayjs(formValues.periodOfStudy[1].toString()).format('DD/MM/YYYY');
      
        console.log(formValues);
     
      const updatedEducation: Omit<IEducation, "id"> = {
          schoolName: formValues.schoolName,
          major: formValues.major,
          level: formValues.level,
          gpa: formValues.gpa,
          timeStart,
          timeEnd
      }

        console.log("new edu", updatedEducation);
        asyncDispatch(updateUserEducation({id: "1", education: updatedEducation})).unwrap().then((result) => {
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

    const gpaInputChangeHanlder = () => {
      console.log("log");
    }
  
    // const defaultDate = dayjs(currentUser.info?.dateOfBirth.toString()).format('YYYY-MM-DD');


    // const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     console.log("handleOnChange",e.target.value);
    //     console.log("handleOnChange",e.target.name);
   
    //     const updatedUserInfo = {
    //         ...currentUser.info,
    //         [e.target.name]: e.target.value
    //     }
     
    //     dispatch(localUpdateUserInfo(updatedUserInfo))

    // }


    return (
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          // initialValues={{
          //   schoolName: educationBg.schoolName || '',
          //   level: educationBg.level || '',
          //   major: educationBg.major || '',
          //   gpa: educationBg.gpa || ''
          // }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Period of Study"
            name="periodOfStudy"
            rules={[{ required: true, message: 'Please input Period of Study' }]}
          >
             <RangePicker
      defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
          </Form.Item>
      
          <Form.Item
            label="School Name"
            name="schoolName"
            rules={[{ required: true, message: 'Please input your job title' }]}
          >
            <Input name="schoolName"  placeholder='please enter your job title' value={""}  />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[{ required: true, message: 'Please input your level' }]}
          >
            <Input name="level"  placeholder='please enter your major' value={""} />
          </Form.Item>
          <Form.Item
            label="Major"
            name="major"
            rules={[{ required: true, message: 'Please input your major' }]}
          >
            <Input name="major"  placeholder='please enter your major' value={""} />
          </Form.Item>
          <Form.Item
            label="GPA"
            name="gpa"
            rules={[{ required: true, message: 'Please input your gpa' }]}
          >
            <InputNumber name="major" min={1} max={10} step={0.1} defaultValue={9.5} onChange={gpaInputChangeHanlder}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-primary">
              Update Education
            </Button>
          </Form.Item>
        </Form>
      )
}

export default EducationForm;