import React from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';

import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
} from 'reactstrap';
import './style.css';
import { logout } from '../../Containers/AuthScreen/Login/redux/action';

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: 'navbar-transparent',
    };
  }
  componentDidMount() {
    window.addEventListener('resize', this.updateColor);
  }
  componentDidUpdate(e) {
    if (
      window.outerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
    }
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  updateColor = () => {
    if (window.innerWidth < 993 && this.state.collapseOpen) {
      this.setState({
        color: 'bg-white',
      });
    } else {
      this.setState({
        color: 'navbar-transparent',
      });
    }
  };
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle('nav-open');
  };
  // this function opens and closes the collapse on small devices
  // it also adds navbar-transparent class to the navbar when closed
  // ad bg-white when opened
  toggleCollapse = () => {
    let newState = {
      collapseOpen: !this.state.collapseOpen,
    };
    if (!this.state.collapseOpen) {
      newState['color'] = 'bg-white';
    } else {
      newState['color'] = 'navbar-transparent';
    }
    this.setState(newState);
  };

  render() {
    const user = sessionStorage.getItem('user');
    const userData = JSON.parse(user);

    const logOutHandler = () => {
      sessionStorage.clear();
      localStorage.clear();
      this.props.history.push('/auth/login');
      this.props.logout();
    };
    return (
      <>
        <Navbar className={classnames('navbar-absolute fixed-top', this.state.color)} expand="lg">
          <Container fluid>
            <div className="navbar-wrapper">
              <div className="navbar-minimize">
                {/* <Button
                  className="btn-icon btn-round"
                  color="default"
                  id="minimizeSidebar"
                  onClick={this.props.handleMiniClick}
                >
                  <i className="nc-icon nc-minimal-right text-center visible-on-sidebar-mini" />
                  <i className="nc-icon nc-minimal-left text-center visible-on-sidebar-regular" />
                </Button> */}
                <img
                  onClick={'' /*() => this.props.history.goBack()*/}
                  style={{ width: '25px', height: '12px', marginLeft: 20 }}
                  src={require('../../assets/img/images/backArrow.png')}
                />
                <p style={{}} className="subscriptionText">
                  Active Subscription
                </p>
              </div>
              <div
                className={classnames('navbar-toggle', {
                  toggled: this.state.sidebarOpen,
                })}
              >
                {/* <button
                  className="navbar-toggler"
                  type="button"
                  onClick={this.toggleSidebar}
                >
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button> */}
              </div>
              {/* <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
                <span className="d-none d-md-block">
                  Paper Dashboard PRO React
                </span>
                <span className="d-block d-md-none">PD PRO React</span>
              </NavbarBrand> */}
            </div>
            <button
              aria-controls="navigation-index"
              aria-expanded={this.state.collapseOpen}
              aria-label="Toggle navigation"
              className="navbar-toggler"
              // data-target="#navigation"
              data-toggle="collapse"
              type="button"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
              <span className="navbar-toggler-bar navbar-kebab" />
            </button>
            <Collapse className="justify-content-end" navbar isOpen={this.state.collapseOpen}>
              <Form>
                {/* <InputGroup className="no-border">
                  <Input defaultValue="" placeholder="Search..." type="text" />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup> */}
              </Form>
              <Nav navbar>
                <NavItem>
                  {/* <NavLink
                    className="btn-magnify"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="nc-icon nc-layout-11" />
                    <p>
                      <span className="d-lg-none d-md-block">Stats</span>
                    </p>
                  </NavLink> */}
                </NavItem>
                <UncontrolledDropdown className="btn-rotate" nav>
                  <DropdownToggle
                    aria-haspopup={true}
                    caret
                    color="default"
                    data-toggle="dropdown"
                    id="navbarDropdownMenuLink"
                    nav
                  >
                    {/* <i className="nc-icon nc-bell-55" /> */}
                    {user.profile_picture ? (
                      <img
                        style={{ width: '67px', height: '67px', borderRadius: '50%' }}
                        src={{ uri: user.profile_picture }}
                      />
                    ) : (
                      <img
                        style={{ width: '67px', height: '67px', borderRadius: '50%' }}
                        src={require('../../assets/img/faces/userdummy.png')}
                      />
                    )}
                    <p
                      style={{
                        fontWeight: 600,
                        fontSize: '24px',
                        color: '#2C2540',
                        marginLeft: '14px',
                        marginRight: '14px',
                      }}
                    >
                      {userData.username}
                    </p>

                    {/* <p>
                      <span className="d-lg-none d-md-block">Some Actions</span>
                    </p> */}
                  </DropdownToggle>
                  <DropdownMenu persist aria-labelledby="navbarDropdownMenuLink" right>
                    <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                      Profile
                    </DropdownItem>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => {
                        e.preventDefault();
                        logOutHandler();
                      }}
                    >
                      {/* <Button
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          {
                            logOutHandler();
                          }
                        }}
                        style={{
                          borderRadius: '16px',
                          backgroundColor: '#9C2B2E',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        Log Out
                      </Button> */}
                      <span>Logout</span>
                    </DropdownItem>
                    {/* <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                      Something else here
                    </DropdownItem> */}
                  </DropdownMenu>
                </UncontrolledDropdown>
                <NavItem>
                  {/* <NavLink
                    className="btn-rotate"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="nc-icon nc-settings-gear-65" />
                    <p>
                      <span className="d-lg-none d-md-block">Account</span>
                    </p>
                  </NavLink> */}
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
}

// export default AdminNavbar;

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AdminNavbar);
