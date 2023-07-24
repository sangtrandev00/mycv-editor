import { Space } from 'antd'
import React from 'react'
import {EditOutlined} from '@ant-design/icons';

type SoftSkillsProps = {
  softSkills: string[]
}

const SoftSkills = (props: SoftSkillsProps) => {
  return (
    <div className="soft-skills">
        <h3 className="soft-skills__title font-bold text-xl bg-dark-primary px-4 py-2" >
        <Space>
          Soft Skills
          <EditOutlined className="peer/career-hover:text-red-500 cursor-pointer text-lg" />
          </Space>
        </h3>
        <p className="soft-skills__list p-4">
         {props.softSkills.join(", ")}
        </p>
    </div>
  )
}

export default SoftSkills