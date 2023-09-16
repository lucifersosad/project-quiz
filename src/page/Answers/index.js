import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";
import { getListAnswerByUser } from "../../services/answerService";
import { getAllTopic } from "../../services/topicService";

function Answers(){
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const topics = await getAllTopic();
      const answers = await getListAnswerByUser();
      const newData = [];
      answers.forEach(item => {
        newData.push({
          ...item,
          ...topics.find((itemTopic) => itemTopic.id === item.topicId),
          id: item.id,
        });
        setData(newData);
      });
    }
    fetchApi();
  }, []);

  console.log(data);

  const columns = [
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Tên chủ đề",
      key: "name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Link to={`/result/${record.id}`} key={record.id}>
          <Button>Xem chi tiết</Button>
        </Link>
      ),
      align: "center",
    },
  ]

  return (
    <>
      <h2>Danh sách các bài đã luyện tập</h2>
      <Table dataSource={data} columns={columns} rowKey="id" size="middle"/>
    </>
  )
}
export default Answers;