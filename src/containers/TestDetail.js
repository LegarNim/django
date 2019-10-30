import React from "react";
import { Card, Skeleton, message } from "antd";
import Questions from "./Questions";
import Choices from "../components/Choices";
import Hoc from "../hoc/hoc";

const cardStyle = {
  marginTop: "20px",
  marginBottom: "20px"
};

const VALUE = {
  title: "Title",
  tag: "java",
  answers: ["a1", "a2"],
  question: ["q1", "q2"],

  questions: [
    { choices: ["a2", "a1"], order: 1 },
    { choices: ["a2-2", "fd;a"], order: 2 }
  ]
};

class TestDetail extends React.Component {
  state = {
    usersAnswers: {}
  };

  onChange = (e, qId) => {
    const { usersAnswers } = this.state;
    usersAnswers[qId] = e.target.value;
    this.setState({ usersAnswers });
  };

  handleSubmit() {
    message.success("Submitting your assignment!");
    const { usersAnswers } = this.state;
    console.log(usersAnswers);
  }

  render() {
    const currentAssignment = VALUE;
    const { title } = currentAssignment;
    const { usersAnswers } = this.state;
    return (
      <Hoc>
        {Object.keys(currentAssignment).length > 0 ? (
          <Hoc>
            {this.props.loading ? (
              <Skeleton active />
            ) : (
              <Card title={title}>
                <Questions
                  submit={() => this.handleSubmit()}
                  questions={currentAssignment.questions.map(q => {
                    return (
                      <Card
                        style={cardStyle}
                        type="inner"
                        key={q.order}
                        title={`${q.order}. ${q.question}`}
                      >
                        <Choices
                          questionId={q.order}
                          choices={q.choices}
                          change={this.onChange}
                          usersAnswers={usersAnswers}
                        />
                      </Card>
                    );
                  })}
                />
              </Card>
            )}
          </Hoc>
        ) : null}
      </Hoc>
    );
  }
}

export default TestDetail;
