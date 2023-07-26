import React from 'react'
import "./Contacts.scss"
import { Space } from 'antd';
import {EditOutlined} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { FormEntryState, showEntryDrawer, startEditingFormState, toggleEntryDrawer } from '../../store/user.slice';

type ContactsProps = {
  info: {name: string;
    dateOfBirth: string;
    phone: string;
    email: string;
    address: string;
    avatar?: string;}
}

const Contacts = (props: ContactsProps) => {

  const { name, dateOfBirth, phone, email, address } = props.info;
  
  const dispatch = useDispatch();

  const contactsEditHandler = () => {
    dispatch(startEditingFormState(FormEntryState.PROJECTS));
    dispatch(toggleEntryDrawer());
  }

  return (
    <div className="contacts">
    <h3 className="contacts__title font-bold text-xl bg-dark-primary px-4 py-2">
      <Space>
      Contact information
      <EditOutlined onClick={contactsEditHandler} className="peer/career-hover:text-red-500 cursor-pointer text-lg" />
      </Space>
    </h3>

    <ul className="contacts__list p-4">
      <li className="contacts__item flex mt-2 contacts__item--name"><span className="contact__label w-1/5 font-bold">Name:</span>  <span className="contact__content">{name}</span> </li>
      <li className="contacts__item flex mt-2 contacts__item--birth-day"><span className="contact__label w-1/5 font-bold">Birth:</span> <span className="contact__content">{dateOfBirth}</span> </li>
      <li className="contacts__item flex mt-2 contacts__item--phone"><span className="contact__label w-1/5 font-bold">Phone:</span> <span className="contact__content">{phone}</span> </li>
      <li className="contacts__item flex mt-2 contacts__item--email"><span className="contact__label w-1/5 font-bold">Email:</span> <span className="contact__content">{email}</span> </li>
      <li className="contacts__item flex mt-2 contacts-item--address"><span className="contact__label w-1/5 font-bold">Address:</span><span className="contact__content">{address}</span> </li>
    </ul>
</div>
  )
}

export default Contacts