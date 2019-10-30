import React, { Component } from "react";
import { Form, Icon, Input, Select, Button } from "antd";
import UploadFile from "../components/Upload";
import { connect } from "react-redux";
import { createLesson } from "../store/actions/lessons";

const { TextArea } = Input;
const { Option } = Select;

let FILE = [];

class CreateLesson extends React.Component {
  state = {
    thumbnail: null
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const lesson = {
          title: values.title,
          body: values.body,
          categories: values.tags,
          thumbnail: FILE,
          teacher: this.props.username
        };
        console.log(lesson);
        this.props.createLesson(this.props.token, lesson);
        this.props.history.push("/");
      }
    });
  };

  handleUpload = fileList => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append("files[]", file);
      FILE = file;
    });
    // console.log(FILE);
    // console.log(formData.get("files[]"));
    FILE = fileList.name;
    // console.log(FILE);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "Please input title!" }]
          })(
            <Input
              prefix={<Icon type="edit" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Title"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("body", {
            rules: [{ required: true, message: "Please input body text!" }]
          })(<TextArea rows={12} placeholder="Body..." />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("tags", {
            rules: [
              {
                required: true,
                message: "Please select languages for your lesson!",
                type: "array"
              }
            ]
          })(
            <Select
              mode="multiple"
              placeholder="Please select languages for your lesson"
            >
              <Option value="java">Java</Option>
              <Option value="javascript">JavaScript</Option>
              <Option value="python">Python</Option>
            </Select>
          )}
        </Form.Item>
        {/* <Form.Item>
          <UploadFile change={this.handleUpload} textUpload="Select Image" />
        </Form.Item> */}
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
        >
          Create Lesson
        </Button>
      </Form>
    );
  }
}

const WrappedNormalLessonForm = Form.create()(CreateLesson);

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    error: state.auth.error,
    loading: state.auth.loading,
    username: state.auth.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLesson: (token, lesson) => dispatch(createLesson(token, lesson))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedNormalLessonForm);
