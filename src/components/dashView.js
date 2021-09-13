import React, { useState, useEffect } from 'react';
import FriendSvg from '../assets/img/schoolbooks.svg';
import ProfSvg from '../assets/img/marks.svg';
import ClassSvg from '../assets/img/class.svg';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import StudentService from '../services/studentService';
import TeacherService from '../services/teacherService';
import PrimaryChart from '../charts/studentChart';
import JhsChart from '../charts/jhsChart';

const DashView = () => {
  const [loading, setloading] = useState(true);
  const [studentNumber, setStudent] = useState(null);
  const [teacherNumber, setTeacher] = useState(null);

  const getStudents = async () => {
    // setLoading(true);
    const data = await StudentService.getStudents();
    if (data.length === 0) {
      setStudent(0);
      return setloading(false);
    } else {
      setStudent(data.length);
      return setloading(false);
    }
  };

  const getTeachers = async () => {
    const data = await TeacherService.getTeachers();
    if (data.length === 0) {
      setTeacher(0);
      return setloading(false);
    } else {
      setTeacher(data.length);
      return setloading(false);
    }
  };

  const getPopulation = async () => {
    getStudents();
    getTeachers();
    return;
  };

  useEffect(() => {
    return getPopulation();
  });

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
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Updates" {...a11yProps(1)} />
            <Tab label="Schedules" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <div>
            <div className="section">
              <div className="row mt-2">
                <div className="col-lg-4 col-md-12 col-sm-12">
                  <div className="card card-success">
                    <div className="card-statistic-4">
                      <div className="align-items-center justify-content-between">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pr-0 pt-3">
                            <div className="card-content">
                              <h4 className="font-22">Students</h4>
                              {loading ? (
                                <Spinner
                                  animation="border"
                                  variant="danger"
                                  style={{ width: 30, height: 30 }}
                                />
                              ) : (
                                <h1 className="text-danger">{studentNumber}</h1>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                              <img
                                src={FriendSvg}
                                alt="friend"
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
                              <h4 className="font-22">Teachers</h4>
                              {loading ? (
                                <Spinner
                                  animation="border"
                                  variant="danger"
                                  style={{ width: 30, height: 30 }}
                                />
                              ) : (
                                <h1 className="text-danger">{teacherNumber}</h1>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                              <img
                                src={ProfSvg}
                                alt="proffessor"
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
                              <h4 className="font-22">Classes</h4>
                              {loading ? (
                                <Spinner
                                  animation="border"
                                  variant="danger"
                                  style={{ width: 30, height: 30 }}
                                />
                              ) : (
                                <h1 className="text-danger">0</h1>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 pl-0">
                            <div className="banner-img">
                              <img
                                src={ClassSvg}
                                alt="class"
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

            <div>
              <h5 className="font-22 mt-2">School Population</h5>
              <div className="font-16 mb-4">
                As at {n} {new Date().getFullYear()}
              </div>

              <div className="section">
                <div className="row mt-2">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className="card card-success shadow-sm">
                      <div className="card-header border-bottom">
                        Primary Section
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
                        JHS Section
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
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/*Section Two - Notifications, Charts */}
          <div className="section">
            <div className="row mt-2">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="card card-success shadow-sm">
                  <div className="card-header border-bottom">
                    <h4>Notifications</h4>
                  </div>
                  <div className="align-items-center justify-content-between">
                    <div className="card-content text-secondary text-center pt-4 pb-4">
                      No Notifications
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="card card-success shadow-sm">
                  <div className="card-header border-bottom">
                    <h4>Messages</h4>
                  </div>
                  <div className="align-items-center justify-content-between">
                    <div className="card-content text-secondary text-center pt-4 pb-4">
                      No Messages
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Section Two - Notifications, Charts */}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <div className="section">
            <div className="row mt-2">
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="card card-success shadow-sm">
                  <div
                    className="card-header border-bottom"
                    style={{
                      display: 'flex',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}
                  >
                    <h4>Activities</h4>
                    <div className="card-header-action">
                      <button type="button" className="btn btn-danger mr-2">
                        <FontAwesomeIcon icon={faUserCheck} /> Create New
                        Activity
                      </button>
                      <button type="button" className="btn btn-success mt-1">
                        <FontAwesomeIcon icon={faBookOpen} /> View All
                      </button>
                    </div>
                  </div>
                  <div className="align-items-center justify-content-between">
                    <div className="card-content text-secondary text-center pt-4 pb-4">
                      No Activities
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="card card-success shadow-sm">
                  <div className="card-header border-bottom">
                    <h4>Term Calendar</h4>
                  </div>
                  <div className="align-items-center justify-content-between">
                    <div className="card-content text-secondary text-center pt-4 pb-4">
                      No Calendar
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
export default DashView;
