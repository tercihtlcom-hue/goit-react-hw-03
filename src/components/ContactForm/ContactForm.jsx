import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import css from './ContactForm.module.css';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Çok kısa! (En az 3 karakter)")
    .max(50, "Çok uzun! (En fazla 50 karakter)")
    .required("Zorunlu alan"),
  number: Yup.string()
    .min(3, "Çok kısa! (En az 3 karakter)")
    .max(50, "Çok uzun!")
    .required("Zorunlu alan"),
});

const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();
  const numberFieldId = useId();

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={ContactSchema} 
      onSubmit={(values, actions) => {
        onAdd(values);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <div className={css.fieldWrapper}>
          <label htmlFor={nameFieldId}>Name</label>
          <Field type="text" name="name" id={nameFieldId} className={css.input} />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>

        <div className={css.fieldWrapper}>
          <label htmlFor={numberFieldId}>Number</label>
          <Field type="text" name="number" id={numberFieldId} className={css.input} />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>

        <button type="submit" className={css.btn}>Add contact</button>
      </Form>
    </Formik>
  );
};

export default ContactForm;