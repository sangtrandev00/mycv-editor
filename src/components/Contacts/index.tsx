import React from 'react'
import "./Contacts.scss"
const Contacts = () => {
  return (
    <div className="contacts">
    <h3 className="contacts__title font-bold text-xl bg-dark-primary px-4 py-2">Contact information</h3>

    <ul className="contacts__list p-4">
      <li className="contacts__item flex mt-2 contacts__item--name"><span className="contact__label w-1/5 font-bold">Name:</span>  <span className="contact__content">Tran Nhat Sang</span> </li>
      <li className="contacts__item flex mt-2 contacts__item--birth-day"><span className="contact__label w-1/5 font-bold">Birth:</span> <span className="contact__content">9/10/2000</span> </li>
      <li className="contacts__item flex mt-2 contacts__item--phone"><span className="contact__label w-1/5 font-bold">Phone:</span> <span className="contact__content">0937988510</span> </li>
      <li className="contacts__item flex mt-2 contacts__item--email"><span className="contact__label w-1/5 font-bold">Email:</span> <span className="contact__content">nhatsang0101@gmail.com</span> </li>
      <li className="contacts__item flex mt-2 contacts-item--address"><span className="contact__label w-1/5 font-bold">Address:</span><span className="contact__content">Di An, Binh Duong</span> </li>
    </ul>
</div>
  )
}

export default Contacts