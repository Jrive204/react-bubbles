import React from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import * as Yup from "yup";

import { Form, Field, Formik, ErrorMessage } from "formik";
import { Button } from "reactstrap";

const Login = () => {
  const { push } = useHistory();

  //Submits ----

  const handleSubmit = (values, { setStatus, resetForm }) => {
    Axios.post(`http://localhost:5000/api/login`, values)

      .then(res => {
        setStatus(res.data);
        resetForm();
        console.log(res, `success`);
        localStorage.setItem("token", res.data.payload);
        push("/bubbles");
      })
      .catch(err => console.log(err))
      .finally();
  };

  // Checking Validations !! ----
  const SignupSchema = () =>
    Yup.object().shape({
      username: Yup.string().min(3, `Name Too Short!`),

      password: Yup.string().required(`Password required`)
    });

  return (
    <div className='login'>
      <h1>Welcome to the Bubble App!</h1>
      <Formik
        initialValues={{ username: ``, password: `` }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}>
        {({ values }) => {
          return (
            <Form className='formbody'>
              <Field
                className='formFields'
                name='username'
                type='text'
                placeholder='UserName'
              />{" "}
              &nbsp;
              {console.log(values, "values")}
              <ErrorMessage name='name' component='span' className='red' />
              <Field
                className='formFields'
                name='password'
                type='password'
                placeholder='Password'
              />
              <ErrorMessage name='password' component='span' className='red' />
              &nbsp;
              <br />
              <Button color='success'>Sign in</Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Login;
