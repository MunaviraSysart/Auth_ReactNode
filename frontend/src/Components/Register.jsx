import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Footer } from './Footer';
import axios from 'axios';

export const Register = () => {

    const navigate = useNavigate();

    //validation schema
    const registerSchema = Yup.object().shape({
        email: Yup.string().required('Please enter email')
            .email('Invalid email address!'),
        password: Yup.string().required('Please enter password')
            .min(8, 'Password must be minimum 8 characters')
            .max(20, 'Password must be maximum 20 characters'),
        mobile: Yup.string().required('Please enter mobile number')
            .max(10, 'Invalid phoneNumber!'),
    })

    //onSubmit
    const onSubmitRegister = async (values) => {
        //console.log('values', values)
        try {
            const url = "http://localhost:5000/api/auth/signup";
            const res = await axios.post(url, values);
            //console.log('ress', res)
            if (res.status === 201) {
                navigate('/signin')
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div className='card'>
                <h2 className='text-center mb-3'>Sign Up</h2>
                <Formik
                    validationSchema={registerSchema}
                    onSubmit={onSubmitRegister}
                    initialValues={{
                        email: '',
                        password: '',
                        mobile: '',
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="password"
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="mobile"
                                    onChange={handleChange}
                                    isInvalid={!!errors.mobile}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.mobile}</Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit">Submit</Button>

                            <div className='mt-2'>
                                Already have an account? <Link to='/signin'>SignIn</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <Footer />
        </>
    )
}
