import React from "react";
import { Card, Tag, Icon, Avatar, Spin } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { getLesson } from "../store/actions/lessons";
import TimeAgo from "timeago-react";
import axios from "axios";

const { Meta } = Card;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Home extends React.Component {
  componentDidMount() {
    this.props.getLesson();
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
    const content = this.props.lessons.map(post => (
      <Col span={10} offset={2}>
        {this.getComments(post.id)}
        <Card
          style={{ width: 300, marginBottom: "15px" }}
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
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>
            <h1>Lessons</h1>
            <Row>{content}</Row>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lessons: state.lessons.lessonList,
    loading: state.lessons.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLesson: () => dispatch(getLesson())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
