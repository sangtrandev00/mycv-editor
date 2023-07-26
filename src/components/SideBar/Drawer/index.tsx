import React, { useState } from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import type { DrawerProps } from 'antd/es/drawer';
import type { RadioChangeEvent } from 'antd/es/radio';
import ContactInfoForm from '../../EntryData/FormContact';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import { FormEntryState, closeEntryDrawer, showEntryDrawer } from '../../../store/user.slice';
import CareerObjectiveForm from '../../EntryData/FormCareerObjective';
import EducationForm from '../../EntryData/FormEducation';
import AwardsForm from '../../EntryData/FormAwards';
import TechSkillsForm from '../../EntryData/FormTechSkills';
import AddSkillsForm from '../../EntryData/FormAddSkills';
import SoftSkillsForm from '../../EntryData/FormSoftSkils';
import LanguagesForm from '../../EntryData/FormLanguages';
import CertificationsForm from '../../EntryData/FormCertifications';
import ProjectsForm from '../../EntryData/FormProjects';

const FormEntryDrawer: React.FC = () => {
  // const [open, setOpen] = useState(false);
  const isOpenDrawer = useSelector((state: RootState) => state.user.isOpenDrawer);
  const formEntryState = useSelector((state: RootState) => state.user.formEntryState);
  
  const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
  
  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch(showEntryDrawer());
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    dispatch(closeEntryDrawer());
  };

  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group>
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Drawer with extra actions"
        mask={false}
        placement={placement}
        width={500}
        onClose={onClose}
        open={isOpenDrawer}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        {formEntryState === FormEntryState.CONTACT_INFO && <ContactInfoForm/>}
        {formEntryState === FormEntryState.CAREER_OBJECTIVE && <CareerObjectiveForm/>}
        {formEntryState === FormEntryState.EDUCATION && <EducationForm/>}
        {formEntryState === FormEntryState.AWARDS && <AwardsForm/>}
        {formEntryState === FormEntryState.PROJECTS && <ProjectsForm/>}
        {formEntryState === FormEntryState.TECH_SKILLS && <TechSkillsForm/>}
        {formEntryState === FormEntryState.ADDITION_SKILLS && <AddSkillsForm/>}
        {formEntryState === FormEntryState.SOFT_SKILLS && <SoftSkillsForm/>}
        {formEntryState === FormEntryState.LANGUAGES && <LanguagesForm/>}
        {formEntryState === FormEntryState.CERTIFICATIONS && <CertificationsForm/>}
      
      </Drawer>
    </>
  );
};

export default FormEntryDrawer;