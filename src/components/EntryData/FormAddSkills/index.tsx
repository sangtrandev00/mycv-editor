import React, {useEffect, useState} from 'react';
import { Button, Checkbox, DatePicker, Form, Input } from 'antd';
import { IInfo } from '../../../types/user.type';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { RootState, useAppDispatch } from '../../../store/store';
import { FormEntryState, defaultUser, localUpdateTechSkills, localUpdateUserInfo, startEditingFormState, toggleEntryDrawer, updateTechnicalSkills, updateUserContactInfo } from '../../../store/user.slice';
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

const AddSkillsForm: React.FC = () => {

    const techSkillsList = useSelector((state: RootState) => state.user.user.techSkills);

    const inititialValues: {[key: string]: string} = techSkillsList.reduce((acc, skillItem,index) => {
      acc[`skill${index + 1}`] = skillItem.name;
      return acc;
    }, {} as {[key: string]: string});

    console.log(inititialValues);

    const asyncDispatch = useAppDispatch();

    const dispatch = useDispatch();

    const onFinish = (formValues: {[key: string]: string}) => {
        // const dateOfBirth = dayjs(formValues.dateOfBirth.toString()).format('DD/MM/YYYY');
        
        const updatedTechSkills = Object.values(formValues).map((value, index) => {
        return {
          id: (index + 1).toString(),
          name: value
        }
      })
      console.log(updatedTechSkills)
  
        asyncDispatch(updateTechnicalSkills({id: "1", techSkills: updatedTechSkills})).unwrap().then((result) => {
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
  
    // const defaultDate = dayjs(currentUser.info?.dateOfBirth.toString()).format('YYYY-MM-DD');

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("handleOnChange",e.target.value);
        console.log("handleOnChange",e.target.name);
   
        const updatedSkill = e.target.value;
     
      const newSkillItem = {
        id: e.target.getAttribute("skill-id") as string,
        name: updatedSkill
      }

        dispatch(localUpdateTechSkills(newSkillItem))

    }

    return (
       <>
       <h3>Additional Skills</h3>
         <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={inititialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >

          {techSkillsList.map((skillItem, index) => {
              return (
                  <Form.Item
                    label={`Skill${index + 1}`}
                    name={`skill${index + 1}`}
                    rules={[{ required: true, message: `Please input your skill${index + 1}!` }]}
                  >
                    <Input name={`skill${index + 1}`} placeholder='please enter your skill' onChange={handleOnChange} value={skillItem.name} skill-id={skillItem.id} />
                  </Form.Item>
              )
          })}
   
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" className="bg-primary">
              Update Additional Skils
            </Button>
          </Form.Item>
        </Form>
       </>
      )
}

export default AddSkillsForm;