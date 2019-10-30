import React, { Component } from "react";
import { Card, Tag, Icon, Spin } from "antd";
import CommentLesson from "../components/CommentLesson";
import { connect } from "react-redux";
import { getLessonDetail } from "../store/actions/lessons";
import TimeAgo from "timeago-react";

const { Meta } = Card;
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

class Lesson extends Component {
  componentDidMount() {
    this.props.getLessonDetail(this.props.match.params.id);
  }

  render() {
    const lesson = this.props.lessonDetail;
    function Categories(props) {
      const clesson = props.lesson.categories;

      if (clesson) {
        return clesson.map(v => {
          return <Tag>{v}</Tag>;
        });
      } else {
        return null;
      }
    }

    return (
      <div>
        {this.props.loading ? (
          <Spin indicator={antIcon} />
        ) : (
          <div>
            <Card
              style={{ width: "90%" }}
              cover={
                <img
                  alt="example"
                  style={{ maxHeight: "500px" }}
                  src="https://cdn-images-1.medium.com/max/1200/0*ngXgBNNdx6iiWP8q.png"
                />
              }
            >
              <Meta
                title={lesson.title}
                description={
                  <div>
                    <p>{lesson.body}</p>
                    <div>
                      <span style={{ margin: "4px" }}>
                        {this.props.commentCount.length} <Icon type="wechat" />
                      </span>
                      <span style={{ margin: "4px" }}>
                        <TimeAgo datetime={lesson.timestamp} />
                      </span>
                    </div>
                    <div style={{ margin: "4px" }}>
                      <Categories lesson={lesson} />
                    </div>
                  </div>
                }
              />
            </Card>
            <CommentLesson />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lessonDetail: state.lessons.lessonDetail,
    loading: state.lessons.loading,
    commentCount: state.lessons.commentsLesson
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getLessonDetail: id => dispatch(getLessonDetail(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lesson);
