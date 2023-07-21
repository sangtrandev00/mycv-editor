import React from 'react'
import { Divider } from 'antd';
import ProjectItem from './ProjectItem';


const Projects = () => {
  return (
    <div className="projects">
    <h3 className="projects__title font-bold text-primary text-2xl">Projects</h3>
    <Divider className="bg-dark-primary opacity-50 my-4"/>
    <div className="projects__list">
       <ProjectItem/>
       <ProjectItem/>
    </div>
</div>
  )
}

export default Projects