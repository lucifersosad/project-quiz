import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopicByTopicId } from "../../services/topicService";
import { getQuestionsByTopicId } from "../../services/questionService";
import GoBack from "../../components/GoBack";
import { Radio, Form, Button } from "antd";
import { getCookie } from "../../helpers/cookie";
import { createAnswer } from "../../services/answerService";

function Quiz() {
  const params = useParams();
  const [topicData, setTopicData] = useState();
  const [quizData, setQuizData] = useState([]);
  const navigate = useNavigate();

  useState(() => {
    const fetchApi = async () => {
      const topic = await getTopicByTopicId(params.id);
      if (topic) {
        setTopicData(topic);
      }
      const questions = await getQuestionsByTopicId(params.id);
      if (questions) {
        setQuizData(questions);
      }
    };
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    console.log(values);
    let selectedAnswers = [];
    Object.entries(values).forEach((item) => {
      selectedAnswers.push({
        questionId: item[0],
        answer: item[1],
      });
    });
    const options = {
      userId: parseInt(getCookie("id")),
      topicId: parseInt(params.id),
      answers: selectedAnswers,
    };
    const result = await createAnswer(options);
    if (result) {
      navigate(`/result/${result.id}`);
    }
  };

  console.log(quizData);

  return (
    <>
      <GoBack />

      {topicData && <h2>Bài Quiz chủ đề: {topicData.name}</h2>}

      {quizData.length > 0 && (
        <Form onFinish={handleFinish} layout="vertical">
          {quizData.map((itemQuestion, i) => (
            <Form.Item
              key={itemQuestion.id}
              name={itemQuestion.id}
              label={`Câu ${i + 1}: ${itemQuestion.question}`}
            >
              <Radio.Group>
                {itemQuestion.answers.map((itemAnswer, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Radio
                      style={{ display: "block" }}
                      key={index}
                      value={index}
                    >
                      {itemAnswer}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </Form.Item>
          ))}

          <Button type="primary" htmlType="submit">
            Nộp bài
          </Button>
        </Form>
      )}
    </>
  );
}
export default Quiz;
