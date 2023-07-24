import React from 'react'
import { IProject } from '../../../types/user.type';


type ProjectItemProps = {
    project: IProject
}


const ProjectItem = (props: ProjectItemProps) => {

    const { name, dateStart, dateEnd, desc, website, repoLink, members, position, technologies } = props.project;

  return (
    <div className="projects__item mt-4">
    <h3 className="projects__item-title font-bold text-xl">{name} </h3>
    <p className="projects__item-time-line mt-2">({dateStart} - {dateEnd})</p>
    <div className="project-item__table">
        <div className="project-item__desc flex my-2">
            <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Description</h4>
            <p className="project-item__desc-text border w-2/3 px-2">{desc}</p>
        </div>
        
        <div className="project-item__desc flex my-2">
            <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Website</h4>
            <a href={repoLink} className="project-item__desc-text border w-2/3 px-2">{website}</a>
        </div>  
              
        <div className="project-item__desc flex my-2">
            <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Github repository</h4>
            <a href={repoLink} className="project-item__desc-text border w-2/3 px-2">{repoLink}</a>
        </div>
       
        <div className="project-item__desc flex my-2">
            <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Number of members</h4>
            <p className="project-item__desc-text border w-2/3 px-2">{members}</p>
        </div>
        <div className="project-item__desc flex my-2">
            <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Position</h4>
            <p className="project-item__desc-text border w-2/3 px-2">{position}</p>
        </div>
        <div className="project-item__desc flex my-2">
            <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Technology in use</h4>
            <p className="project-item__desc-text border w-2/3 px-2">{technologies}</p>
        </div>
    </div>
</div>
  )
}

export default ProjectItem