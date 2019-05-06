import React, { Component } from 'react';
import { Nav , NavItem , NavLink, Button} from 'reactstrap';

var Template = require('@coreui/react/lib');

const logo = "static/img/brand/logo.svg";
const sygnet = "static/img/brand/sygnet.svg";
const alt_logo = "Logo Aplikasi KoPL9";

interface DefaultHeaderPropsModel { nama: string; onLogout:any; }

class Header extends Component<DefaultHeaderPropsModel> 
{
  public render() : JSX.Element
  {
    return (
      <React.Fragment>

        <Template.AppSidebarToggler className="d-lg-none" display="md" mobile />

        <Template.AppNavbarBrand
          full={{ src: logo, width: 89, height: 25, alt: alt_logo }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: alt_logo }}
        />
        <Template.AppSidebarToggler className="d-md-down-none" display="lg" />
          <Nav className="m1-auto">
            <NavItem className="px-3 text-right">
              <NavLink to="#" className="nav-link" >
                <i className="icon-user"></i> {this.props.nama}
              </NavLink>
            </NavItem>
            <NavItem className="px-3 text-right">
              <Button color="primary" onClick={this.props.onLogout}>
                <i className="icon-logout"></i> Logout
              </Button>
            </NavItem>
          </Nav>
          
          <Nav className="ml-auto" navbar></Nav>
        
      </React.Fragment>
    );
  }
}

export default Header;