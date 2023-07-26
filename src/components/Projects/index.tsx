import React from 'react'
import { Divider, Space } from 'antd';
import ProjectItem from './ProjectItem';
import { IProject } from '../../types/user.type';
import {EditOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { FormEntryState, showEntryDrawer, startEditingFormState } from '../../store/user.slice';

type ProjectsProps = {
  projects: IProject[]
}

const Projects = (props: ProjectsProps) => {

  const dispatch = useDispatch();

  const projectsEditHandler = () => {
    dispatch(startEditingFormState(FormEntryState.PROJECTS));
    dispatch(showEntryDrawer());
  }

  return (
    <div className="projects">
    <h3 className="projects__title font-bold text-primary text-2xl">
      <Space>
        Projects
        <EditOutlined onClick={projectsEditHandler} className="peer/career-hover:text-red-500 cursor-pointer text-lg" />
      </Space>
   
    </h3>
    <Divider className="bg-dark-primary opacity-50 my-4"/>
    <div className="projects__list">
       {props.projects.map((projectItem) => {
        return  <ProjectItem project={projectItem}/>
       })}
    </div>
</div>
  )
}

export default Projects