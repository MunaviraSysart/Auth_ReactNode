import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './style.css';
import { FiLogIn } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Footer } from './Footer';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


export const Login = () => {

    const navigate = useNavigate();
    const [error, setError] = useState('');

    //validation schema
    const loginSchema = Yup.object().shape({
        email: Yup.string().required('Please enter email')
            .email('Invalid email address!'),
        password: Yup.string().required('Please enter password')
            .min(8, 'Password must be minimum 8 characters')
            .max(20, 'Password must be maximum 20 characters'),
    })

    //onsubmit
    const onSubmitLogin = async (data) => {
        try {
            //console.log('data', data)
            const url = "http://localhost:5000/api/auth/signin";
            const res = await axios.post(url, data)
            //console.log('res', res)
            if (res?.status === 200) {
                localStorage.setItem('token', res?.data?.accessToken)
                localStorage.setItem('user', res?.data?.email)
                navigate('/')
                window.location.reload()
            }
        } catch (error) {
            if (error.response &&
                error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.error)
            }
        }
    }

    return (
        <>
            <div className='card'>
                <h2 className='text-center mb-3'>Sign In</h2>
                {error && <Alert variant="danger">
                    <span>{error}</span>
                </Alert>
                }
                <Formik
                    validationSchema={loginSchema}
                    onSubmit={onSubmitLogin}
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        errors,
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="validationFormik01">
                                <Form.Label>Email ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    isInvalid={!!errors.email}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="validationFormik02">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="password"
                                    onChange={handleChange}
                                    isInvalid={!!errors.password}
                                />
                                <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit"><FiLogIn /> Login</Button>

                            <div className='mt-2'>
                                Don't have an account? <Link to='/signup'>SignUp</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            <Footer />
        </>
    )
}