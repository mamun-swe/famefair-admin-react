import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import axios from 'axios'
import api from '../../url'
import './style.css'
import { Dropdown } from 'react-bootstrap'

import { plus } from 'react-icons-kit/metrize/plus'
import { androidPerson } from 'react-icons-kit/ionicons/androidPerson'
import { pencil } from 'react-icons-kit/iconic/pencil'
import { warning } from 'react-icons-kit/typicons/warning'

const Index = () => {
    const [admins, setAdmins] = useState([])


    useEffect(() => {
        fetchData()
    }, [])

    // fetch data
    const fetchData = () => {
        axios.get(`${api}admin/auth/index`)
            .then(res => {
                setAdmins(res.data.admins)
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
            })
    }

    // block admin
    const bloackAccount = id => {
        axios.put(`${api}admin/auth/block/${id}?status=blocked`)
            .then(res => {
                if (res.status === 200) {
                    fetchData()
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err.response)
                }
            })
    }

    // Unblock ADmin
    const unBlockAdmin = id => {
        axios.put(`${api}admin/auth/block/${id}?status=offline`)
            .then(res => {
                if (res.status === 200) {
                    fetchData()
                }
            })
            .catch(err => {
                if (err) {
                    console.log(err.response)
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
                                    <div><h5 className="mb-0 mt-1 mt-lg-2 text-capitalize">{admins.length} Admins</h5></div>
                                    <div className="ml-auto">
                                        <Link to="/admin/create" type="button" className="btn btn-light shadow-none text-dark">
                                            <Icon icon={plus} size={15} />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="card-body p-0">
                                <table className="table data-table table-sm table-responsive-md table-borderless rounded">
                                    <thead>
                                        <tr className="border-bottom">
                                            <td className="pl-3"><p>SL</p></td>
                                            <td><p>Name</p></td>
                                            <td><p>E-mail</p></td>
                                            <td><p>Phone</p></td>
                                            <td><p>Role</p></td>
                                            <td className="text-center"><p>Status</p></td>
                                            <td className="text-center"><p>Action</p></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {admins.map((data, i) =>
                                            <tr className="border-bottom" key={i}>
                                                <td className="pl-3"><p>{i + 1}</p></td>
                                                <td className="text-capitalize"><p>{data.name}</p></td>
                                                <td className="text-lowercase"><p>{data.email}</p></td>
                                                <td><p>{data.phoneNumber}</p></td>
                                                <td className="text-capitalize"><p>{data.role}</p></td>
                                                <td className="text-center text-capitalize">
                                                    {data.status === 'offline' ? (
                                                        <p className="text-muted bg-light pb-1">{data.status}</p>
                                                    ) : data.status === 'online' ? (
                                                        <p className="text-success bg-light pb-1">{data.status}</p>
                                                    ) : data.status === 'blocked' ? (
                                                        <p className="text-danger bg-light pb-1">{data.status}</p>
                                                    ) : null}
                                                </td>
                                                <td className="text-center">
                                                    <Dropdown>
                                                        <Dropdown.Toggle className="btn btn-sm btn-success shadow-none py-1" variant="white" id="dropdown-basic">
                                                            Action
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu alignRight className="shadow border-0 rounded-0 p-0">
                                                            <Dropdown.Item as={Link} to={`/admin/${data._id}/profile`}>
                                                                <Icon icon={androidPerson} size={15} className="pr-2" />View Profile
                                                            </Dropdown.Item>
                                                            <Dropdown.Item as={Link} to={`/admin/${data._id}/edit`}>
                                                                <Icon icon={pencil} size={14} className="pr-2" />Edit Profile
                                                            </Dropdown.Item>
                                                            {data.status === 'blocked' ? (
                                                                <Dropdown.Item href="#" onClick={() => unBlockAdmin(data._id)}><Icon icon={warning} size={15} className="text-warning pr-2" />Unblock Account</Dropdown.Item>
                                                            ) :
                                                                <Dropdown.Item href="#" onClick={() => bloackAccount(data._id)}><Icon icon={warning} size={15} className="text-danger pr-2" />Block Account</Dropdown.Item>
                                                            }
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;