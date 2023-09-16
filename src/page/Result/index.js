/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnswerByAnswerId } from "../../services/answerService";
import { getQuestionsByTopicId } from "../../services/questionService";
import { getTopicByTopicId } from "../../services/topicService";
import { Button, Progress, Radio, Form, Typography, Card, Tag } from "antd";
const { Text } = Typography;

function Result() {
  const params = useParams();
  const [dataResult, setDataResult] = useState([]);
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswer = await getAnswerByAnswerId(params.id);
      const questionsList = await getQuestionsByTopicId(dataAnswer.topicId);
      let result = [];
      let countTrue = 0;
      for (let i = 0; i < questionsList.length; i++) {
        questionsList[i].correctAnswer === dataAnswer.answers[i].answer &&
          countTrue++;
        result.push({
          ...questionsList[i],
          answer: dataAnswer.answers[i].answer,
        });
      }
      const countFalse = questionsList.length - countTrue;
      const truePercent = ((countTrue / questionsList.length) * 100).toFixed(0);

      setDataResult(result);
      const dataTopic = await getTopicByTopicId(dataAnswer.topicId);

      setInfo({
        countTrue: countTrue,
        countFalse: countFalse,
        all: questionsList.length,
        rate: truePercent,
        topicName: dataTopic.name,
        topicId: dataTopic.id,
      });
    };
    fetchApi();
  }, []);

  console.log(dataResult);
  console.log(info);

  return (
    <>
      {info && (
        <>
          <h2>Kết quả chủ đề: {info.topicName}</h2>
          <div>
            <span>
              Đúng: <strong>{info.countTrue}</strong>
            </span>
            <span>
              {" "}
              | Sai: <strong>{info.countFalse}</strong>
            </span>
            <span>
              {" "}
              | Tổng số câu: <strong>{info.all}</strong>
            </span>
          </div>
          <div style={{ width: 220 }}>
            <Progress
              percent={info.rate}
              status={info.rate == 100 ? "success" : "active"}
              size="small"
            />
          </div>
        </>
      )}

      {dataResult.length > 0 && (
        <>
          <Card>
            <Form>
              {dataResult.map((itemQuestion, i) => (
                <div key={itemQuestion.id}>
                  <p>
                    Câu {i + 1}: {itemQuestion.question}
                    <Tag style={{marginLeft: "10px"}} color={itemQuestion.answer === itemQuestion.correctAnswer ? "green" : "red"}>{itemQuestion.answer === itemQuestion.correctAnswer ? "Đúng" : "sai"}</Tag>
                  </p>
                  {itemQuestion.answers.map((itemAnswer, index) => {
                    let type = "";
                    if (index === itemQuestion.answer) {
                      type = "danger";
                    }
                    if (index === itemQuestion.correctAnswer) {
                      type = "success";
                    }
                    return (
                      <div
                        key={index}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <Radio.Group disabled defaultValue={itemQuestion.answer}>
                          <Radio
                            name={itemAnswer.id}
                            style={{ display: "block" }}
                            value={index}
                          />
                        </Radio.Group>
                        <Text type={type}>{itemAnswer}</Text>
                      </div>
                    );
                  })}
                </div>
              ))}
            </Form>
          </Card>
          <Link to={`/quiz/${info?.topicId}`}>
            <Button type="primary" style={{ marginTop: "20px" }}>
              Làm lại
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
export default Result;
