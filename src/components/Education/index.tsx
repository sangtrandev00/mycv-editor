import React, {useState} from 'react'
import { FormEntryState, showEntryDrawer, startEditingEducation, startEditingFormState, toggleEntryDrawer } from '../../store/user.slice';
import { useDispatch } from 'react-redux';
import { EditOutlined } from '@ant-design/icons';

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
    const [hovering, setHovering] = useState(false);
    const dispatch = useDispatch();

    const handleMouseEnter = () => {
        setHovering(true);

        console.log("hover")
      };
    
      const handleMouseLeave = () => {
        setHovering(false);
      };

    //   const editCurrentEducation = () => {
    //     // console.log("edit", id);
    //     dispatch(startEditingEducation(id));
    //     // dispatch(startEditingFormState(FormEntryState.PROJECTS));
    //     dispatch(showEntryDrawer());
    //   }

    const editCurrentEducationHandler = (educateId: string) => {
        console.log("edit current education handler", educateId);
        dispatch(startEditingEducation(educateId));
        dispatch(startEditingFormState(FormEntryState.EDUCATION))
        dispatch(toggleEntryDrawer());
    }

    return (
    <div className="education__wrap">

        {props.education.map((educateItem) => {
            return (
                    <>
      

                            <div key={educateItem.id} className="education__info flex mb-4 relative" 
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                      {hovering && (
                    <div className="absolute right-4 top-4">
                    <EditOutlined onClick={() => editCurrentEducationHandler(educateItem.id)} className="cursor-pointer text-xl"/>
                    </div>
      )}
                            
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
                    
                    </>
            )
        })}
     
    </div>
  )
}

export default Education