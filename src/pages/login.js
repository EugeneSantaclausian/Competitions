import React, { useRef, useState } from 'react';
import User from '../assets/img/preprange.svg';
import Spinner from 'react-bootstrap/Spinner';
import {
  faEnvelope,
  faKey,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../context/authContext';

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setError(`Please enter Email & Password`);
      return setShow(true);
    }

    try {
      setError('');
      setLoading(true);
      const response = await login(email, password);
      console.log(response);
      if (response.operationType === 'signIn') {
        return history.push('/dashboard');
      }
    } catch (err) {
      setError(`${err}`);
      setLoading(false);
      return setShow(true);
    }
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      {loading ? (
        <div
          className="text-center mt-4"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <h3 className="text-dark mt-4 pt-4">Authenticating</h3>
          <Spinner
            animation="grow"
            variant="secondary"
            style={{ width: 200, height: 200 }}
          />
        </div>
      ) : (
        <div>
          <div className="bg-white mb-3 text-center shadow-sm">
            <div className="text-center">
              <img src={User} alt="pic" width="200" height="90" />
            </div>
          </div>
          <div className="text-center pt-2 pb-4">
            <div className="text-center pb-2"></div>
            <h2 className="text-center text-dark pt-4">Sign In</h2>
            <p
              className="text-center pb-4 mb-2"
              style={{ marginTop: -5, fontSize: 16 }}
            >
              Use your Admin Account
            </p>
          </div>

          <div className="row pb-4">
            <div className="col-lg-3 col-md-3 col-sm-12 ml-4"></div>
            <div className=" col-lg-6 col-md-6 col-sm-12 align-items-center pullUp px-lg-5">
              {error && show ? (
                <Modal
                  size="sm"
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                  show={show}
                  onHide={handleClose}
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                      <h4
                        className="text-danger"
                        style={{
                          borderBottomWidth: 2,
                          borderBottomColor: 'grey',
                        }}
                      >
                        Error
                      </h4>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h6>{error}</h6>
                  </Modal.Body>
                  <Modal.Footer></Modal.Footer>
                </Modal>
              ) : null}
              <form
                className="container form-group text-center"
                onSubmit={(e) => handleLogin(e)}
              >
                <div className="input-group" style={{ width: '95%' }}>
                  <div className="input-group-prepend">
                    <div className="input-group-text" style={{ padding: 10 }}>
                      <FontAwesomeIcon icon={faEnvelope} />
                    </div>
                  </div>
                  <input
                    className="form-control form-control-lg mb-4"
                    placeholder="Email/PIN"
                    type="text"
                    style={{ fontSize: 16 }}
                    ref={emailRef}
                  />
                </div>

                <div className="input-group" style={{ width: '95%' }}>
                  <div className="input-group-prepend">
                    <div className="input-group-text" style={{ padding: 10 }}>
                      <FontAwesomeIcon icon={faKey} />
                    </div>
                  </div>
                  <input
                    className="form-control form-control-lg mb-4"
                    placeholder="Password"
                    type="password"
                    style={{
                      fontSize: 16,
                    }}
                    ref={passwordRef}
                  />
                </div>

                <button
                  className="btn btn-lg btn-success"
                  type="submit"
                  disabled={loading}
                  style={{ paddingLeft: '20%', paddingRight: '20%' }}
                >
                  <span
                    style={{
                      fontSize: 15,
                    }}
                  >
                    Submit
                    <FontAwesomeIcon icon={faSignOutAlt} className="ml-2" />
                  </span>
                </button>
              </form>
              <div className="text-center text-dark">
                <footer className="d-inline bold">
                  Copyright ©{' '}
                  <a
                    href="https://preprange.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Preprange.
                  </a>{' '}
                  {new Date().getFullYear()}
                  {/* Outputs 2020 */}
                </footer>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 mr-4"></div>
          </div>
        </div>
      )}
    </div>
  );
}
