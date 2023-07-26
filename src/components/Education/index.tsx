import React from 'react'

type EducationProps = {
    education: {
        id: string,
        schoolName: string;
        major: string;
        level: string;
        gpa: number;
        timeStart: string;
        timeEnd: string;
    }[]
}

const Education = (props: EducationProps) => {

    return (
    <div className="education__wrap">

        {props.education.map((educateItem) => {
            return (
                        <div key={educateItem.id} className="education__info flex mb-4">
                        <div className="education__info-timeline">
                       {educateItem.timeStart}-{educateItem.timeEnd}
                        </div>
                        <div className="education__info-school ml-4">
                            <div className="education__info-school-name font-bold">
                               {educateItem.schoolName}
                            </div>
                            <div className="education__info-school-major">
                                <span>Major: </span> - {educateItem.major}
                            </div>
                            <div className="education__info-school-level">
                                <span>Level: </span> - {educateItem.level}
                            </div>
                            <div className="education__info-school-level">
                                <span>GPA: </span> - {educateItem.gpa} (current)
                            </div>
                </div>
                </div>
            )
        })}
     
    </div>
  )
}

export default Education