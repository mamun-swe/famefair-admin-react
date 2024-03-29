import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Icon } from 'react-icons-kit'
import { useForm } from "react-hook-form"
import { message } from 'antd'
import axios from 'axios'
import api from '../../url'

import { arrow_left } from 'react-icons-kit/ikons/arrow_left'
import { spinner3 } from 'react-icons-kit/icomoon/spinner3'

const Create = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false)

    // Success Notification
    const success = () => {
        message.success('Successfully Admin Created')
    }

    const failed = (msg) => {
        message.warning(msg)
    }

    // Submit Form
    const onSubmit = data => {
        setLoading(true)
        axios.post(`${api}admin/auth/register`, data)
            .then(res => {
                if (res.status === 201) {
                    setLoading(false)
                    success()
                }
            })
            .catch(err => {
                if (err && err.response.status === 409) {
                    failed(err.response.data.message)
                }
                if (err && err.response.status === 500) {
                    failed('Unknown error')
                }
            })
    }

    return (
        <div className="admin-list">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-sm border-0">
                            {/* Header */}
                            <div className="card-header bg-white py-3">
                                <div className="d-flex">
                                    <div><h5 className="mb-0 mt-1 mt-lg-2 text-capitalize">New Admin</h5></div>
                                    <div className="ml-auto">
                                        <Link to="/admin/all-admin" type="button" className="btn btn-light shadow-none text-dark">
                                            <Icon icon={arrow_left} size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="card-body pb-lg-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">

                                        {/* Name */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-4">
                                                {errors.name && errors.name.message ? (
                                                    <small className="text-danger">{errors.name && errors.name.message}</small>
                                                ) : <small className="text-muted">Name</small>
                                                }
                                                <input
                                                    name="name"
                                                    type="text"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Name is required",
                                                        minLength: {
                                                            value: 5,
                                                            message: "Please enter minimum 5 characters",
                                                        },
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* E-mail */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-4">
                                                {errors.email && errors.email.message ? (
                                                    <small className="text-danger">{errors.email && errors.email.message}</small>
                                                ) : <small className="text-muted">E-mail</small>
                                                }
                                                <input
                                                    name="email"
                                                    type="text"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "E-mail is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                            message: "Invalid email address"
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-4">
                                                {errors.phoneNumber && errors.phoneNumber.message ? (
                                                    <small className="text-danger">{errors.phoneNumber && errors.phoneNumber.message}</small>
                                                ) : <small className="text-muted">Phone</small>
                                                }
                                                <input
                                                    name="phoneNumber"
                                                    type="text"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Phone is required",
                                                        minLength: {
                                                            value: 11,
                                                            message: "Invalid phone number",
                                                        },
                                                        maxLength: {
                                                            value: 11,
                                                            message: "Invalid phone number",
                                                        }
                                                    })}
                                                />
                                            </div>
                                        </div>


                                        {/* Role */}
                                        <div className="col-12 col-lg-6">
                                            <div className="form-group mb-4">
                                                {errors.role && errors.role.message ? (
                                                    <small className="text-danger">{errors.role && errors.role.message}</small>
                                                ) : <small className="text-muted">Role</small>
                                                }
                                                <select
                                                    name="role"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        required: "Role is required"
                                                    })}
                                                >
                                                    <option value="admin">Admin</option>
                                                    <option value="super_admin">Super Admin</option>
                                                    <option value="order_management">Order Management</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                {errors.password && errors.password.message ? (
                                                    <small className="text-danger">{errors.password && errors.password.message}</small>
                                                ) : <small className="text-muted">Password</small>
                                                }
                                                <input
                                                    name="password"
                                                    type="password"
                                                    className="form-control shadow-none"
                                                    ref={register({
                                                        minLength: {
                                                            value: 6,
                                                            message: "Please enter minimum 6 characters",
                                                        },
                                                        required: "Please enter password",
                                                    })}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <button type="submit" className="btn btn-primary shadow-none text-white float-right submit-btn">
                                                {loading ? (
                                                    <p className="mb-0"><Icon icon={spinner3} size={15} className="spin mr-2" />adding...</p>
                                                ) : <p className="mb-0">submit</p>}
                                            </button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;