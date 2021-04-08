import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createLabel } from '../../actions/label'
import { grayForModalCaptions } from '../../util/colors'
import analyticsLogger from '../../util/analyticsLogger'
import UserCan from '../common/UserCan'
import { Card, Button, Typography, Input } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
const { Text } = Typography

class LabelNew extends Component {
  state = {
    labelName: "",
  }

  handleInputUpdate = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { labelName } = this.state;

    analyticsLogger.logEvent("ACTION_CREATE_LABEL", {"name": labelName})
    this.props.createLabel({ name: labelName })
    .then(data => {
      this.props.handleChangeView("allDevices")
    })
  }

  render() {
    return (
      <div style={{ padding: '30px 30px 20px 30px' }}>
        <Card title="Enter Label Details">
          <Input
            placeholder="Enter Label Name"
            name="labelName"
            value={this.state.labelName}
            onChange={this.handleInputUpdate}
            style={{ marginTop: 10 }}
          />
          <Text style={{ marginBottom: 20, marginTop: 10, fontSize: 14, color: grayForModalCaptions }}>Label names must be unique</Text>
        </Card>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
          <UserCan>
            <Button key="submit" icon={<SaveOutlined />} onClick={this.handleSubmit} style={{ margin: 0 }}>
              Save Label
            </Button>
          </UserCan>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createLabel }, dispatch)
}

export default connect(null, mapDispatchToProps)(LabelNew)