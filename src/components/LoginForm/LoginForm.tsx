import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { login } from "../../services/firebase.ts";

import css from "./LoginForm.module.css";
import Button from "../Button/Button";

interface LoginFormProps {
  onClose: () => void;
}

export default function LoginForm({ onClose }: LoginFormProps) {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невірний формат email")
      .required("Введіть ваш email"),
    password: Yup.string()
      .min(6, "Пароль повинен мати не менше 3 символів")
      .required("Введіть пароль"),
  });

  interface valuesProps {
    email: string;
    password: string;
  }

  const onSubmit = async (
    values: valuesProps,
    { setSubmitting }: FormikHelpers<valuesProps>
  ) => {
    const { email, password } = values;
    console.log("Отправлено:", values);
    // setTimeout(() => {
    //   setSubmitting(false); // Отключаем состояние загрузки после отправки формы
    //   onClose();
    //   // перенаправляю на авторизовану сторінку користувача
    // }, 2000);
    try {
      await login(email, password);
      alert("Login successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }
    setSubmitting(false);
    onClose();
  };

  return (
    <div>
      <h2 className={css.title}>
        Please enter your Email and Password to login into your account
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className={css.formWrapper}>
              <div className={css.inputWrapper}>
                <label className={css.inputTitle} htmlFor='email'>
                  Email:
                </label>
                <Field type='email' name='email' />
                <ErrorMessage name='email' component='div' className='error' />
              </div>
              <div className={css.inputWrapper}>
                <label className={css.inputTitle} htmlFor='password'>
                  Password:
                </label>
                <Field type='password' name='password' />
                <ErrorMessage
                  name='password'
                  component='div'
                  className='error'
                />
              </div>
            </div>

            <div className={css.buttonsWrapper}>
              <Button
                action='confirm'
                type='submit'
                disabled={isSubmitting}
                // onClick={onClose}
                // перенаправляю на авторизовану сторінку користувача
              >
                {isSubmitting ? "Loging in..." : "Log In"}
              </Button>
              <Button action='decline' onClick={onClose}>
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
