import { useEffect, useState } from "react";
import { getAllTopic } from "../../services/topicService";
import { Link } from "react-router-dom";
import { Button, Table } from "antd";

function Topics(){
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getAllTopic();
      if (result){
        setTopics(result);
      }
    }
    fetchApi();
  }, []);

  console.log(topics);

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
        <Link to={`/quiz/${record.id}`} key={record.id}>
          <Button>Làm bài</Button>
        </Link>
      ),
      align: "center",
    },
  ]

  return (
    <>
      <h2>Danh sách chủ đề ôn luyện</h2>
      <Table dataSource={topics} columns={columns} rowKey="id" size="middle"/>
    </>
  )
}
export default Topics;