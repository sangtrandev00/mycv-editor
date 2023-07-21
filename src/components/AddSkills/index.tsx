import React from 'react'

type AddSkillsProps = {
  addSkills: {
    id: string;
    name: string;
  }[]
}

const AddSkills = (props: AddSkillsProps) => {

  const {addSkills} = props

  return (
    <div className="add-skills">
        <h3 className="add-skills__title font-bold text-xl bg-dark-primary px-4 py-2" >Technical Skills</h3>
        <ul className="add-skills__list p-4">
        <li className="add-skills__item mt-2">HTML, CSS, JavaScript (ReactJS, React-Native, Lit)</li>
        <li className="add-skills__item mt-2">HTML, CSS, JavaScript (ReactJS, React-Native, Lit)</li>
        <li className="add-skills__item mt-2">HTML, CSS, JavaScript (ReactJS, React-Native, Lit)</li>
        <li className="add-skills__item mt-2">HTML, CSS, JavaScript (ReactJS, React-Native, Lit)</li>
        </ul>
    </div>
  )
}

export default AddSkills