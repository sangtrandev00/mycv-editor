import React from 'react'
import {EditOutlined} from '@ant-design/icons';
import { Space } from 'antd';
import { FormEntryState, startEditingFormState, toggleEntryDrawer } from '../../store/user.slice';
import { useDispatch } from 'react-redux';

interface TechSkillsProps {
  techSkills: {
    id: string;
    name: string;
  }[]
}

const TechSkills = (props: TechSkillsProps) => {

  
  const dispatch = useDispatch();

  const techSkillsEditHandler = () => {
    dispatch(startEditingFormState(FormEntryState.PROJECTS));
    dispatch(toggleEntryDrawer());
  }

  return (
    <div className="tech-skills">
        <h3 className="tech-skills__title font-bold text-xl bg-dark-primary px-4 py-2" >
          <Space>
            Technical Skills
            <EditOutlined onClick={techSkillsEditHandler} className="peer/career-hover:text-red-500 cursor-pointer text-lg" />
          </Space>
        </h3>
        <ul className="tech-skills__list p-4">
          {props.techSkills.map((techItem) => {
            return (
              <li className="tech-skills__item mt-2">{techItem.name}</li>
            )
          })}
        </ul>
    </div>
  )
}

export default TechSkills