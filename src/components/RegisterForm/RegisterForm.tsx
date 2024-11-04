import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import css from "./RegisterForm.module.css";
import Button from "../Button/Button";
import { registerUser } from "../../redux/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

interface RegisterFormProps {
  onClose: () => void;
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const dispatch = useAppDispatch();

  const initialValues = {
    email: "",
    password: "",
    repeatPassword: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Невірний формат email")
      .required("Введіть ваш email"),
    password: Yup.string()
      .min(6, "Пароль повинен мати не менше 3 символів")
      .required("Введіть пароль"),
    repeatPassword: Yup.string()
      .min(6, "Пароль повинен мати не менше 3 символів")
      .required("Введіть пароль"),
  });

  interface valuesProps {
    email: string;
    password: string;
    repeatPassword: string;
  }

  const onSubmit = async (
    values: valuesProps,
    { setSubmitting }: FormikHelpers<valuesProps>
  ) => {
    const { email, password } = values;
    setSubmitting(false);
    try {
      dispatch(registerUser({ email, password }));
      alert("Registration successful!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred:", error);
      }
    }

    onClose();
  };

  return (
    <div>
      <h2 className={css.title}>
        Please enter your Email and Password to create new account
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
              <div className={css.inputWrapper}>
                <label className={css.inputTitle} htmlFor='repeatPassword'>
                  Repeat your password:
                </label>
                <Field type='password' name='repeatPassword' />
                <ErrorMessage
                  name='repeatPassword'
                  component='div'
                  className='error'
                />
              </div>
            </div>

            <div className={css.buttonsWrapper}>
              <Button action='confirm' type='submit' disabled={isSubmitting}>
                {isSubmitting ? "Registering..." : "Register"}
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
