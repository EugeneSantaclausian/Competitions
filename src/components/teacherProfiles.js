import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from 'react-bootstrap/Spinner';
import TeacherService from '../services/teacherService';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
import Error from './error';
import Table from 'react-bootstrap/Table';
import { Dropdown } from 'react-bootstrap';

const TeacherProfiles = () => {
  const [loading, setloading] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState(false);

  const getTeachers = async () => {
    setloading(true);
    try {
      const data = await TeacherService.getTeachers();
      console.log('TEACHERS DATA', data);
      setTeachers(data);
      return setloading(false);
    } catch (error) {
      setError(true);
      console.error(error);
      return setloading(false);
    }
  };

  useEffect(() => {
    return getTeachers();
  }, []);

  return (
    <div>
      <div className="row mt-3">
        <div className="col-lg-11 mx-auto">
          <div className="card card-success">
            <div className="card-header border-bottom">
              <h4>Teacher Profiles</h4>
              <div className="card-header-action">
                <Dropdown className="mr-2">
                  <Dropdown.Toggle
                    size="sm"
                    variant="success"
                    id="dropdown-basic"
                  >
                    View By Class
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Primary 1</Dropdown.Item>
                    <Dropdown.Item>Primary 2</Dropdown.Item>
                    <Dropdown.Item>Primary 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <button type="button" className="btn btn-danger mt-1">
                  <FontAwesomeIcon icon={faUserCheck} /> Create Terminal Report
                </button>
              </div>
            </div>
            <div className="card-body">
              {error && !loading ? (
                <div style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Error text="Failed to Find Teachers List" />
                  <button
                    type="button"
                    onClick={() => getTeachers()}
                    className="btn btn-md btn-danger"
                    style={{ width: '50%', marginLeft: '25%' }}
                  >
                    <span className="h6 pt-1">Retry</span>
                  </button>
                </div>
              ) : (
                <Table striped bordered hover size="sm" variant="light">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <Spinner
                        animation="border"
                        variant="primary"
                        style={{
                          width: 40,
                          height: 40,
                        }}
                      />
                    ) : (
                      teachers.map((teacher) => {
                        return (
                          <tr>
                            <td>{teachers.indexOf(teacher) + 1}</td>
                            <td>{teacher.firstName}</td>
                            <td>{teacher.lastName}</td>
                            <td>
                              <a href="/teachers">Details</a>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </Table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfiles;
