import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Error from './error';
import StudentService from '../services/studentService';

//Search Student Form
const DeleteForm = () => {
  const studentNameRef = useRef();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [found, setFound] = useState(false);
  const [error, setError] = useState(false);

  const searchStudentById = async (e) => {
    e.preventDefault();
    setLoading(true);
    const id = studentNameRef.current.value;
    try {
      const data = await StudentService.getStudentById(id);
      if (data.length > 0) {
        console.log('STUDENT IS', data);
        setStudents(data);
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
                {students.map((student) => {
                  return (
                    <tr>
                      <td>{students.indexOf(student) + 1}</td>
                      <td>{student.firstName}</td>
                      <td>{student.lastName}</td>
                      <td>
                        <a href="/students">Details</a>
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
          <form onSubmit={searchStudentById}>
            <div className="form-group">
              <label htmlFor="Student Name">Enter Student Name/ID</label>
              <input
                type="text"
                className="form-control"
                id="student Name"
                required
                ref={studentNameRef}
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

export default DeleteForm;
