import React, { Component, Fragment } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

const { Header, Content, Footer, Sider } = Layout;

class CustomLayout extends Component {
  render() {
    return (
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
        >
          <div
            className="logo"
            style={{
              height: "32px",
              background: "rgba(255, 255, 255, 0.2)",
              margin: "16px"
            }}
          />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="0">
              <Link to="/">
                {" "}
                <Icon type="home" />
                Home
              </Link>
            </Menu.Item>
            {this.props.token !== null ? (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                <Menu.Item key="1">
                  <Link to={`/profile/${this.props.userId}`}>
                    <Icon type="profile" />
                    Profile
                  </Link>
                </Menu.Item>
                <Menu.Item key="4">
                  <Link to="/tests/">
                    <Icon type="solution" />
                    Tests
                  </Link>
                </Menu.Item>
              </Menu>
            ) : (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                <Menu.Item key="2">
                  <Link to="/login/">
                    <Icon type="user" />
                    Login
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Link to="/signup/">
                    <Icon type="user-add" />
                    Signup
                  </Link>
                </Menu.Item>
              </Menu>
            )}

            {this.props.token !== null && this.props.is_teacher ? (
              <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
                <Menu.Item key="6">
                  <Link to="/create_lesson/">
                    <Icon type="form" />
                    Create Lesson
                  </Link>
                </Menu.Item>
                <Menu.Item key="7">
                  <Link to="/create_test/">
                    <Icon type="file-add" />
                    Create Test
                  </Link>
                </Menu.Item>
              </Menu>
            ) : null}
            {this.props.token !== null ? (
              <Menu.Item key="9" onClick={this.props.logout}>
                Logout
              </Menu.Item>
            ) : null}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }} />
          <Content style={{ margin: "24px 16px 0" }}>
            <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.auth.userId,
    token: state.auth.token,
    is_teacher: state.auth.is_teacher
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomLayout)
);
