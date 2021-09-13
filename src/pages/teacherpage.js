/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop,
  faUserAlt,
  faUserTie,
  faChalkboardTeacher,
  faChartBar,
  faUserCog,
  faBell,
  faEnvelope,
  faSignOutAlt,
  faEllipsisV,
  faAlignJustify,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import {
  makeStyles,
  useTheme,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Modal from 'react-bootstrap/Modal';
import Logo from '../assets/img/sidu-ed-icn.png';
import TeacherView from '../components/teachersView';
import { useAuth } from '../context/authContext';
import { Spinner } from 'react-bootstrap';

const drawerWidth = 240;

const mytheme = createMuiTheme({
  typography: {
    fontFamily: [
      'Poppins Light',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      'sans-serif',
      'Roboto',
      'Arial',
    ].join(','),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },

  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function TeacherPage(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const history = useHistory();
  // const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    try {
      setError('');
      await logout();
      return history.push('/');
    } catch {
      return setError('Failed to Logout');
    }
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        {' '}
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <FontAwesomeIcon icon={faSignOutAlt} style={{ color: '#696969' }} />
        </IconButton>
        Confirm Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <FontAwesomeIcon icon={faEnvelope} style={{ color: '#696969' }} />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={0} color="secondary">
            <FontAwesomeIcon icon={faBell} style={{ color: '#696969' }} />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <FontAwesomeIcon icon={faSignOutAlt} style={{ color: '#696969' }} />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const drawer = (
    <div>
      <div className={classes.toolbar} />

      <Divider style={{ marginTop: -64 }} />

      <div style={{ marginLeft: 15 }} className="row">
        <img
          src={Logo}
          alt="pic"
          width="30"
          height="30"
          className="ml-4 mt-3 mr-1"
        />
        <h5 className="font-22 pt-3 pb-2 mt-1">Admin</h5>
      </div>

      <Divider />
      <List>
        <Link
          to="/dashboard"
          style={{ textDecorationLine: 'none', color: 'black' }}
        >
          <ListItem button style={{ marginTop: -10 }}>
            <ListItemAvatar>
              <Avatar className="bg-white">
                <FontAwesomeIcon
                  icon={faDesktop}
                  style={{ color: '#3e3e3e' }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>

        <Link
          to="/students"
          style={{ textDecorationLine: 'none', color: 'black' }}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: '#fff' }}>
                <FontAwesomeIcon
                  icon={faUserAlt}
                  style={{ color: '#3e3e3e' }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Students" />
          </ListItem>
        </Link>

        <Link
          to="/teachers"
          style={{ textDecorationLine: 'none', color: 'black' }}
        >
          <ListItem button style={{ backgroundColor: '#e1fade' }}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: '#54ca68' }}>
                <FontAwesomeIcon icon={faUserTie} style={{ color: '#fff' }} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Teachers" />
          </ListItem>
        </Link>

        <Link
          to="/classes"
          style={{ textDecorationLine: 'none', color: 'black' }}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar className="bg-white">
                <FontAwesomeIcon
                  icon={faChalkboardTeacher}
                  style={{ color: '#3e3e3e' }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Classes" />
          </ListItem>
        </Link>

        <Link
          to="/predictions"
          style={{ textDecorationLine: 'none', color: 'black' }}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar className="bg-white">
                <FontAwesomeIcon
                  icon={faChartBar}
                  style={{ color: '#3e3e3e' }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Manage Predictions" />
          </ListItem>
        </Link>
      </List>

      <Divider />

      <List>
        <Link
          to="/settings"
          style={{ textDecorationLine: 'none', color: 'black' }}
        >
          <ListItem button>
            <ListItemAvatar>
              <Avatar className="bg-white">
                <FontAwesomeIcon
                  icon={faUserCog}
                  style={{ color: '#3e3e3e' }}
                />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>

        <ListItem button>
          <ListItemAvatar>
            <Avatar className="bg-white">
              <FontAwesomeIcon icon={faUserTie} style={{ color: '#3e3e3e' }} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Contact Us" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <ThemeProvider theme={mytheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classes.appBar}
          elevation={0}
          style={{ backgroundColor: '#54ca68' }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <FontAwesomeIcon icon={faAlignJustify} />
            </IconButton>

            <div style={{ width: '30%' }} className="mx-auto" />

            <div className={classes.sectionDesktop}>
              {currentUser ? (
                <div className="">
                  <IconButton aria-label="logged in user" color="inherit">
                    <FontAwesomeIcon icon={faUserAlt} />
                  </IconButton>
                  <span className="font-18">
                    {currentUser && currentUser.email}
                  </span>
                </div>
              ) : (
                <Spinner
                  animation="border"
                  variant="light"
                  style={{ width: 20, height: 20 }}
                />
              )}
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <FontAwesomeIcon icon={faEnvelope} />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={0} color="secondary">
                  <FontAwesomeIcon icon={faBell} />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <FontAwesomeIcon icon={faEllipsisV} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <h5 className="font-25 p-3 mb-4 text-center">Teachers</h5>

          <TeacherView />
          {error ? (
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
                    Error!!
                  </h4>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h6>{error}</h6>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          ) : null}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default TeacherPage;
