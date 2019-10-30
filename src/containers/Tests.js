import React from "react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

const { Meta } = Card;

class Tests extends React.Component {
  render() {
    return (
      <div>
        <h1>Tests</h1>
        <div>
          <Row>
            <Col span={10} offset={2}>
              <Card
                title="JavaScript in the world"
                extra={<Link to="1">More</Link>}
                style={{ width: 300, marginBottom: "15px" }}
                cover={
                  <img
                    alt="example"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                  />
                }
              >
                <Tag>JavaScript</Tag>
              </Card>
            </Col>
            <Col span={10} offset={2}>
              <Card
                title="JavaScript in the world"
                extra={<Link to="1">More</Link>}
                style={{ width: 300, marginBottom: "15px" }}
                cover={
                  <img
                    alt="example"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                  />
                }
              >
                <Tag>JavaScript</Tag>
              </Card>
            </Col>
            <Col span={10} offset={2}>
              <Card
                title="JavaScript in the world"
                extra={<Link to="3">More</Link>}
                style={{ width: 300, marginBottom: "15px" }}
                cover={
                  <img
                    alt="example"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png"
                  />
                }
              >
                <Tag>JavaScript</Tag>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Tests;
