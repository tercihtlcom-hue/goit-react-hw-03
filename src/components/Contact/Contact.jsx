import { FaUser, FaPhoneAlt } from "react-icons/fa";
import css from './Contact.module.css';

const Contact = ({ data: { id, name, number }, onDelete }) => {
  return (
    <div className={css.container}>
      <div className={css.info}>
        <p className={css.text}>
          <FaUser className={css.icon} /> {name}
        </p>
        <p className={css.text}>
          <FaPhoneAlt className={css.icon} /> {number}
        </p>
      </div>
      <button className={css.btn} type="button" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default Contact;