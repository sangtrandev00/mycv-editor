import { Space } from 'antd'
import React from 'react'
import {EditOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { FormEntryState, startEditingFormState, toggleEntryDrawer } from '../../store/user.slice';
type AddSkillsProps = {
  addSkills: string[]
}

const AddSkills = (props: AddSkillsProps) => {

  const {addSkills} = props;
  
  const dispatch = useDispatch();

    const addSkillsEditHandler = () => {
    dispatch(startEditingFormState(FormEntryState.PROJECTS));
    dispatch(toggleEntryDrawer());
  }

  return (
    <div className="add-skills">
        <h3 className="add-skills__title font-bold text-xl bg-dark-primary px-4 py-2" >
          <Space>
          Additional Skills
          <EditOutlined onClick={addSkillsEditHandler} className="peer/career-hover:text-red-500 cursor-pointer text-lg" />

          </Space>
        </h3>
        <p className="add-skills__list p-4">
            {addSkills.join(', ')}
        </p>
    </div>
  )
}

export default AddSkills