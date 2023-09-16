import { Button, Card, Col, Form, Input, Row, message } from "antd";
import { rules } from "../../constants";
import { checkEmail, register } from "../../services/userService";
import { generateToken } from "../../helpers/generateToken";
import { useNavigate } from "react-router-dom";

function Register(){
  const [mess, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const handleFinish = async (values) =>{
    const result = await checkEmail(values.email);
    if (result.length > 0){
      mess.error("Email đã tồn tại");
    } else {
      const newToken = generateToken();
      values.token = newToken;
      const resultRegister = await register(values);
      if (resultRegister){
        mess.success("Đăng kí tài khoản thành công");
        navigate("/login");
      }
    }
  }
  return (
    <>
      {contextHolder}

      <Row align="center" style={{ marginTop: 50 }}>
            <Col span={12}>
              <Card title="New register">
                <Form layout="vertical" onFinish={handleFinish}>
                  <Form.Item
                    label="Full Name"
                    name="fullName"
                    rules={rules}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={rules}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={rules}
                  >
                    <Input.Password />
                  </Form.Item>


                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
          </Row>
    </>
  )
}
export default Register;