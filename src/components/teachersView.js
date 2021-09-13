import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderOpen,
  faUserPlus,
  faTrashAlt,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import NotesSvg from '../assets/img/notes.svg';
import AssessSvg from '../assets/img/assessment.svg';
import SalariesSvg from '../assets/img/salaries.svg';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import PrimaryChart from '../charts/studentChart';
import JhsChart from '../charts/jhsChart';
import Form from '../components/registerTeacher';
import SearchForm from './searchTeacherForm';
import TeacherProfiles from '../components/teacherProfiles';

const TeacherComponent = () => {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: '#f8f9fa',
    },
  }));

  function MyAccordion() {
    const [loading, setLoading] = useState(false);

    const searchTeacher = (e) => {
      //search request simulator
      e.preventDefault();
      setLoading(true);
      setTimeout(() => setLoading(false), 1500);
    };

    return (
      <div className="text-center">
        <Accordion style={{ width: '95%' }}>
          <Card style={{ borderRdius: 60 }}>
            <Accordion.Toggle
              as={Card.Header}
              className="bg-success text-white"
              eventKey="0"
            >
              <span className="h6 pt-1 text-center">
                <FontAwesomeIcon icon={faUserPlus} /> Register New Teacher
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Form />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card border="light" className="text-center">
            <Accordion.Toggle
              as={Card.Header}
              className="bg-primary text-white"
              eventKey="1"
            >
              <span className="h6 pt-1">
                <FontAwesomeIcon icon={faSearch} /> Search for Teacher
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <SearchForm />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card border="light" className="text-center">
            <Accordion.Toggle
              as={Card.Header}
              className="bg-danger text-white"
              eventKey="2"
            >
              <span className="h6 pt-1">
                <FontAwesomeIcon icon={faTrashAlt} /> Delete Teacher
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <div className="row">
                  <div className="col-lg-3"></div>
                  <div className="col-lg-6">
                    <form onSubmit={searchTeacher}>
                      {loading ? (
                        <Spinner
                          animation="border"
                          variant="primary"
                          style={{ width: 40, height: 40 }}
                        />
                      ) : (
                        <div className="form-group">
                          <label htmlFor="Student Name">
                            Enter Teacher Name/ID
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="student Name"
                            required
                          />
                          <button
                            type="submit"
                            className="btn btn-md btn-danger mt-3 pr-3 pl-3 w-100"
                          >
                            Delete <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                  <div className="col-lg-3"></div>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }

  function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    var d = new Date();
    var month = [];
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';
    var n = month[d.getMonth()];

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          color="transparent"
          elevation={0}
          style={{ backgroundColor: '#e1fade' }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            centered
          >
            <Tab label="Admissions" {...a11yProps(0)} />
            <Tab label="Statistics" {...a11yProps(1)} />
            <Tab label="Teachers List" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <MyAccordion />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>
            <div className="section">
              <div className="row mt-4">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="card card-success">
                    <div className="card-statistic-4">
                      <div className="align-items-center justify-content-between">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                              <h2 className="font-22">Lesson Notes</h2>

                              <button className="btn btn-md btn-success">
                                Manage <FontAwesomeIcon icon={faFolderOpen} />
                              </button>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                              <img
                                src={NotesSvg}
                                alt="Prof"
                                height="120"
                                width="120"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="card card-success">
                    <div className="card-statistic-4">
                      <div className="align-items-center justify-content-between">
                        <div className="row ">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                              <h2 className="font-22">Salaries</h2>

                              <button className="btn btn-md btn-success">
                                Manage <FontAwesomeIcon icon={faFolderOpen} />
                              </button>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                              <img
                                src={SalariesSvg}
                                height="120"
                                width="120"
                                alt="Predict"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="card card-success">
                    <div className="card-statistic-4">
                      <div className="align-items-center justify-content-between">
                        <div className="row ">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                              <h2 className="font-22">Assessments</h2>

                              <button className="btn btn-md btn-success">
                                Manage <FontAwesomeIcon icon={faFolderOpen} />
                              </button>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                              <img
                                src={AssessSvg}
                                alt="Class"
                                height="120"
                                width="120"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h5 className="font-22 mt-4">Teachers Population</h5>
            <div className="font-16 mb-4">
              As at {n} {new Date().getFullYear()}
            </div>

            <div className="section">
              <div className="row mt-2">
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="card card-success shadow-sm">
                    <div className="card-header border-bottom">
                      Primary Teachers
                    </div>
                    <div className="align-items-center justify-content-between">
                      <div className="card-content text-center">
                        <PrimaryChart />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="card card-success shadow-sm">
                    <div className="card-header border-bottom">
                      JHS Teachers
                    </div>
                    <div className="align-items-center justify-content-between">
                      <div className="card-content">
                        <JhsChart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TeacherProfiles />
        </TabPanel>
      </div>
    );
  }

  return (
    <div>
      <div className="section">
        <div className="row">
          <SimpleTabs />
        </div>
      </div>
    </div>
  );
};
export default TeacherComponent;
