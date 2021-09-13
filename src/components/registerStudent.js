import React, { useState, useRef } from 'react';
import StudentService from '../services/studentService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Success from './success';
import Error from './error';
import Spinner from 'react-bootstrap/Spinner';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const StudentRegistrationForm = () => {
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const othernameRef = useRef();
  const ageRef = useRef();
  const dateRef = useRef();
  const classRef = useRef();
  const p_firstnameRef = useRef();
  const p_lastnameRef = useRef();
  const firstaddressRef = useRef();
  const secondaddressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();

  const createStudent = async (e) => {
    e.preventDefault();
    setLoading(true);
    const studentData = {
      firstName: firstnameRef.current.value,
      lastName: lastnameRef.current.value,
      otherName: othernameRef.current.value,
      age: ageRef.current.value, //Number
      dateofBirth: dateRef.current.value, //Date
      class: classRef.current.value,
      parentFirstName: p_firstnameRef.current.value,
      parentLastName: p_lastnameRef.current.value,
      firstAddress: firstaddressRef.current.value,
      secondAddress: secondaddressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zip: zipRef.current.value, //Number
    };
    try {
      const response = await StudentService.admitStudent(studentData);
      if (!response.error) {
        setSuccess(true);
        console.log('POST STUDENT res:', response);
        return setLoading(false);
      }
    } catch (error) {
      setErrorText(`${error}`);
      setError(true);
      setLoading(false);
      return console.error(error);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner
          animation="border"
          variant="primary"
          style={{ width: 40, height: 40 }}
        />
      ) : success ? (
        <div>
          <Success text="Student Admitted Successfully" />
          <button
            type="button"
            onClick={() =>
              success ? setSuccess(false) : error ? setError(false) : null
            }
            className="btn btn-md btn-success"
            style={{ width: '50%' }}
          >
            <span className="h6 pt-1">Done</span>
          </button>
        </div>
      ) : error ? (
        <div>
          <Error text={errorText} />
          <button
            type="button"
            onClick={() =>
              success ? setSuccess(false) : error ? setError(false) : null
            }
            className="btn btn-md btn-danger"
            style={{ width: '50%' }}
          >
            <span className="h6 pt-1">Done</span>
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={createStudent}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="firstName">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  required
                  ref={firstnameRef}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="lastName">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  required
                  ref={lastnameRef}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="otherName">Other Name(s)</label>
                <input
                  type="text"
                  className="form-control"
                  id="otherName"
                  ref={othernameRef}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="date">
                  Date of Birth <span className="text-danger">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="date"
                  required
                  ref={dateRef}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="otherName">
                  Class / Grade <span className="text-danger">*</span>
                </label>
                <select id="inputState" className="form-control" required>
                  <option defaultValue disabled={true}>
                    Select Class
                  </option>
                  <option ref={classRef}>1</option>
                  <option ref={classRef}>2</option>
                  <option ref={classRef}>3</option>
                  <option ref={classRef}>4</option>
                  <option ref={classRef}>5</option>
                  <option ref={classRef}>6</option>
                  <option ref={classRef}>7</option>
                  <option ref={classRef}>8</option>
                  <option ref={classRef}>9</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="age">
                  Age <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  className="form-control"
                  id="age"
                  required
                  ref={ageRef}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="parentFirstName">
                  First Name of One Parent/Guardian{' '}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="parentFirstName"
                  required
                  ref={p_firstnameRef}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="parentLastName">
                  Last Name of One Parent/Guardian{' '}
                  <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="parentLastName"
                  required
                  ref={p_lastnameRef}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress">
                Address <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
                required
                ref={firstaddressRef}
              />
            </div>
            <div className="form-group">
              <label htmlFor="inputAddress2">Address 2</label>
              <input
                type="text"
                className="form-control"
                id="inputAddress2"
                placeholder="Apartment, studio, or floor"
                ref={secondaddressRef}
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">
                  City <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCity"
                  required
                  ref={cityRef}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">State</label>
                <select id="inputState" className="form-control">
                  <option defaultValue disabled={true}>
                    Choose
                  </option>
                  <option ref={stateRef}>Greater Accra</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="inputZip">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputZip"
                  ref={zipRef}
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-lg btn-success"
              style={{ width: '70%' }}
            >
              <span className="h6 pt-1">
                Register <FontAwesomeIcon icon={faCheckCircle} />
              </span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentRegistrationForm;
