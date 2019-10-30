import React, { Component } from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import { connect } from "react-redux";
import { createComment } from "../store/actions/lessons";
import TimeAgo from "timeago-react";

const TextArea = Input.TextArea;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

let COMMENT = [];

export class CommentLesson extends Component {
  state = {
    comments: [],
    submitting: false,
    value: ""
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true
    });

    const comment = {
      user: this.props.username,
      content: this.state.value,
      lesson: this.props.lessonDetail.id
    };

    // this.props.createComment(this.props.token, comment);
    console.log(comment);

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: "",
        comments: [
          {
            author: this.props.username,
            avatar:
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow()
          },
          ...this.state.comments
        ]
      });
      this.props.createComment(this.props.token, comment);
    }, 1000);
  };

  componentDidMount() {
    setTimeout(() => {
      return this.props.comments.map(v => {
        // const comments = [
        //   {
        //     author: v.user,
        //     avatar:
        //       "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        //     content: v.content,
        //     datetime: <TimeAgo datetime={v.timestamp} />
        //   }
        // ];
        this.setState({
          comments: [
            {
              author: v.user,
              avatar:
                "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
              content: v.content,
              datetime: <TimeAgo datetime={v.timestamp} />
            }
          ]
        });
      });
    }, 1000);
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div>
        {/* {this.getComments()} */}
        {this.props.token !== null ? (
          <Comment
            avatar={
              <Avatar
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        ) : null}

        {comments.length > 0 && <CommentList comments={comments} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    lessonDetail: state.lessons.lessonDetail,
    comments: state.lessons.commentsLesson
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: (token, comment) => dispatch(createComment(token, comment))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentLesson);
