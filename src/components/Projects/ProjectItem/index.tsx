import React from 'react'

const ProjectItem = () => {
  return (
    <div className="projects__item mt-4">
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
  )
}

export default ProjectItem