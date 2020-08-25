import React, { Component } from 'react';
import { debugSidebarBackgroundColor } from '../../util/colors'
import { Typography, Icon } from 'antd';
const { Text } = Typography

class Sidebar extends Component {

  constructor(props) {
    super(props);
  }

  handleToggle = () => {
    const { toggle } = this.props;
    toggle();
  }

  render() {
    const { show, iconPosition, sidebarIcon, iconBackground } = this.props;
    let topPercentage;
    switch (iconPosition) {
      case 'top':
        topPercentage = '44';
        break;
      case 'middle':
        topPercentage = '50';
        break;
      default:
        topPercentage = '56';
    }
    return (
      <div
        style={{
          background: debugSidebarBackgroundColor,
          position: 'absolute',
          top: 55,
          width: show ? 500 : 0,
          height: 'calc(100vh - 55px)',
          right: 0,
          zIndex: show ? 10 : 1,
          padding: 0,
          transition: 'all 0.5s ease',
        }}
      >
        <div
          style={{
            position: 'relative',
            left: '-60px',
            width: 50,
            height: 50,
            top: `calc(${topPercentage}% - 25px)`,
            backgroundColor: iconBackground,
            borderRadius: '9999px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
          onClick={this.handleToggle}
        >
          <Text style={{
            color: 'white',
            fontSize: 25,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform:'translate(-50% , -50%)'
          }}>
            {sidebarIcon}
          </Text>
        </div>
        {
          show && this.props.children
        }
      </div>
    )
  }
}


export default Sidebar