import React, { Component } from "react";
import Hoc from "../hoc/hoc";
import { List, Card, Row, Col, Icon, Avatar, Tag, Spin } from "antd";
import Result from "../components/Result";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getLessonProfile } from "../store/actions/lessons";
import TimeAgo from "timeago-react";
import axios from "axios";

const { Meta } = Card;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export class Profile extends Component {
  componentDidMount() {
    this.props.getLessonProfile(this.props.match.params.id);
  }
  getComments(id) {
    axios
      .get(`http://127.0.0.1:8000/getComments/get/?id=${id}`)
      .then(res => {
        localStorage.setItem(`commentCount-${id}`, res.data.length);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    const content = this.props.lessonProfileList.map(post => (
      <Col span={10} offset={2}>
        {this.getComments(post.id)}
        <Card
          style={{ width: 300, height: 350, marginBottom: "15px" }}
          cover={
            <img
              alt="example"
              src="https://cdn-images-1.medium.com/max/1200/0*ngXgBNNdx6iiWP8q.png"
            />
          }
          actions={[
            <span>
              {localStorage.getItem(`commentCount-${post.id}`)}{" "}
              <Icon type="wechat" />
            </span>,
            <span>
              <TimeAgo datetime={post.timestamp} />
            </span>,
            <Link to={`/lesson/${post.id}`}>More</Link>
          ]}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={post.title}
            description={
              <div>
                <p>{post.body}</p>
                {post.categories.map(v => {
                  return <Tag>{v}</Tag>;
                })}
              </div>
            }
          />
        </Card>
      </Col>
    ));
    return (
      <div>
        {console.log(this.props.lessonProfileList)}
        <Hoc>
          <h1>Hi {this.props.username}</h1>
          <List
            size="large"
            dataSource="1"
            renderItem={a => <Result key="1" grade="80" />}
          />
          <hr />
          <h1>Your lessons</h1>
        </Hoc>
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <Row>{content}</Row>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    lessonProfileList: state.lessons.lessonProfileList,
    loading: state.lessons.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLessonProfile: id => dispatch(getLessonProfile(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
