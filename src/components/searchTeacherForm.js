import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Error from './error';
import TeacherService from '../services/teacherService';

//Search Student Form
const SearchForm = () => {
  const teacherNameRef = useRef();
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [found, setFound] = useState(false);
  const [error, setError] = useState(false);

  const searchTeacherById = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = teacherNameRef.current.value;
    try {
      const data = await TeacherService.getTeacherById(id);
      if (data.length > 0) {
        setTeachers(data);
        setFound(true);
        setError(false);
        return setLoading(false);
      } else {
        setError(true);
        setFound(false);
        return setLoading(false);
      }
    } catch (error) {
      setError(true);
      setFound(false);
      return setLoading(false);
    }
  };

  return (
    <div className="row">
      <div className="col-lg-3"></div>
      <div className={found ? 'col-lg-12' : 'col-lg-6'}>
        {loading && !found && !error ? (
          <Spinner
            animation="border"
            variant="primary"
            style={{ width: 40, height: 40 }}
          />
        ) : found && !error && !loading ? (
          <div>
            <h6 className="pb-3">Match Found</h6>
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
                {teachers.map((teacher) => {
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
                })}
              </tbody>
            </Table>
            <button
              type="button"
              onClick={() => setFound(false)}
              className="btn btn-md btn-primary mt-3 w-50"
            >
              Close
            </button>
          </div>
        ) : error && !found && !loading ? (
          <div>
            <Error text="No Match Found" />
            <button
              type="button"
              onClick={() => setError(false)}
              className="btn btn-md btn-danger"
              style={{ width: '50%' }}
            >
              <span className="h6 pt-1">Close</span>
            </button>
          </div>
        ) : (
          <form onSubmit={searchTeacherById}>
            <div className="form-group">
              <label htmlFor="Student Name">
                Enter Teacher ID / First Name / Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="teacher Name"
                required
                ref={teacherNameRef}
              />
              <button
                type="submit"
                className="btn btn-md btn-primary mt-3 pr-3 pl-3 w-100"
              >
                Search <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default SearchForm;
