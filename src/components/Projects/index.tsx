import React from 'react'
import { Divider } from 'antd';
import ProjectItem from './ProjectItem';


const Projects = () => {
  return (
    <div className="projects">
    <h3 className="projects__title font-bold text-primary text-2xl">Projects</h3>
    <Divider className="bg-dark-primary opacity-50 my-4"/>
    <div className="projects__list">
        <div className="projects__item">
            <h3 className="projects__item-title font-bold text-xl">MyCV.vn </h3>
            <p className="projects__item-time-line mt-2">(06/2018 - Present)</p>
            <div className="project-item__table">
                <div className="project-item__desc flex my-2">
                    <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Description</h4>
                    <p className="project-item__desc-text border w-2/3 px-2">Ứng dụng tạo CV theo chuẩn chuyên nghiệp, luôn luôn cho phép tải về PDF miễn phí</p>
                </div>
                <div className="project-item__desc flex my-2">
                    <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Github repository</h4>
                    <p className="project-item__desc-text border w-2/3 px-2">https://github.com/sangtrandev00</p>
                </div>
                <div className="project-item__desc flex my-2">
                    <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Number of members</h4>
                    <p className="project-item__desc-text border w-2/3 px-2">1</p>
                </div>
                <div className="project-item__desc flex my-2">
                    <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Position</h4>
                    <p className="project-item__desc-text border w-2/3 px-2">Frontend, Backend, Deployment, BA</p>
                </div>
                <div className="project-item__desc flex my-2">
                    <h4 className="project-item__desc-title w-1/3 font-medium border px-2">Technology in use</h4>
                    <p className="project-item__desc-text border w-2/3 px-2">Frontend: HTML, CSS, Jquery
                Backend: C#, MySQL Server</p>
                </div>
            </div>
        </div>
       <ProjectItem/>
       <ProjectItem/>
    </div>
</div>
  )
}

export default Projects