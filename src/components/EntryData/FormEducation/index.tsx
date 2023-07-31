import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, notification } from 'antd';
import type { DatePickerProps, TimeRangePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { defaultUser, localUpdateEducation, localUpdateUserInfo, updateUserContactInfo, updateUserEducation } from '../../../store/user.slice';
import { useDispatch, useSelector } from 'react-redux';
import { IEducation } from '../../../types/user.type';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;

interface IFormValues {
    schoolName: string;
    major: string;
    level: string;
    gpa: number;
    periodOfStudy: DatePickerProps[];
}

const EducationForm: React.FC = () => {
    const dateFormat = 'DD/MM/YYYY';
    const weekFormat = 'MM/DD';
    const monthFormat = 'YYYY/MM';

    const currEducation = useSelector((state: RootState) => state.user.currEducation);
    const educationList = useSelector((state: RootState) => state.user.user.education);
    const [education, setEducation] = useState(educationList);
    console.log("current education: ", currEducation);
  
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

        console.log("new education ", education)

        asyncDispatch(updateUserEducation({id: "1", education: education})).unwrap().then((result) => {
            console.log("result: ", result);

            notification.success({
              message: 'Notification',
              description: 'Update Education successfully',
              duration: 2
            })
        }).catch((error) => {
            console.log(error);
        });
        
      };
      
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
          
    const onChange: TimeRangePickerProps['onChange'] = (date, dateStrings) => {
        console.log(date, dateStrings);

        const dateStart = dateStrings[0];
        const dateEnd = dateStrings[1];

        const updatedCurrEducation = {
          ...currEducation,
          timeStart: dateStart,
          timeEnd: dateEnd
      }

        dispatch(localUpdateEducation(updatedCurrEducation as IEducation))
    };

    const gpaInputChangeHanlder = (gpa: number | null) => {
      console.log("log", gpa);

    }
  
    // const defaultDate = dayjs(currentUser.info?.dateOfBirth.toString()).format('YYYY-MM-DD');


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   
        const updatedCurrEducation = {
           ...currEducation,
           [e.target.name]: e.target.value
        }
     
        dispatch(localUpdateEducation(updatedCurrEducation as IEducation))

    }
    
    useEffect(() => {
      console.log(educationList);
      setEducation(educationList);
    }, [educationList]);

    return (
        <>
        <h3>Education Form</h3>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{
            schoolName: currEducation?.schoolName || '',
            level: currEducation?.level || '',
            major: currEducation?.major || '',
            gpa: currEducation?.gpa || ''
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Period of Study"
            name="periodOfStudy"
            // rules={[{ required: true, message: 'Please input Period of Study' }]}
          >
             <RangePicker
             onChange={onChange}
            defaultValue={[dayjs(currEducation?.timeStart, dateFormat), dayjs(currEducation?.timeEnd, dateFormat)]}
            format={dateFormat}
    />
          </Form.Item>
      
          <Form.Item
            label="School Name"
            name="schoolName"
            rules={[{ required: true, message: 'Please input your job title' }]}
          >
            <Input name="schoolName"  placeholder='please enter your job title' onChange={handleInputChange}  />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[{ required: true, message: 'Please input your level' }]}
          >
            <Input name="level"  placeholder='please enter your major' onChange={handleInputChange} />
          </Form.Item>
          <Form.Item
            label="Major"
            name="major"
            rules={[{ required: true, message: 'Please input your major' }]}
          >
            <Input name="major"  placeholder='please enter your major' onChange={handleInputChange} />
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
        </>
      )
}

export default EducationForm;