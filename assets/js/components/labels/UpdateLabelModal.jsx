import React, { Component } from "react";
import { Modal, Button, Typography, Input } from "antd";
import analyticsLogger from "../../util/analyticsLogger";
const { Text } = Typography;

class UpdateLabelModal extends Component {
  state = {
    labelName: "",
  };

  handleInputUpdate = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { labelName } = this.state;

    this.props.handleUpdateLabel(labelName);
    analyticsLogger.logEvent("ACTION_UPDATE_LABEL", {
      id: this.props.label.id,
      name: labelName,
    });
    this.props.onClose();
  };

  componentDidUpdate = (prevProps) => {
    if (!prevProps.open && this.props.open) {
      setTimeout(
        () =>
          this.setState({
            labelName: null,
          }),
        200
      );
    }
  };

  render() {
    const { open, onClose, label } = this.props;

    return (
      <Modal
        title="Label Settings"
        visible={open}
        onCancel={onClose}
        centered
        onOk={this.handleSubmit}
        footer={[
          <Button key="back" onClick={onClose}>
            Discard Changes
          </Button>,
          <Button key="submit" type="primary" onClick={this.handleSubmit}>
            Apply Changes
          </Button>,
        ]}
        bodyStyle={{ padding: 0 }}
      >
        <div style={{ padding: "30px 50px" }}>
          <Text strong style={{ fontSize: 16 }}>
            Label Name
          </Text>
          <Input
            placeholder={label.name}
            name="labelName"
            value={this.state.labelName}
            onChange={this.handleInputUpdate}
            style={{ marginBottom: 20, marginTop: 4 }}
            suffix={`${
              this.state.labelName ? this.state.labelName.length : "0"
            }/50`}
            maxLength={50}
          />
        </div>
      </Modal>
    );
  }
}

export default UpdateLabelModal;
