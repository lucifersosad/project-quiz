import { Button, Card, Checkbox, Col, Form, Input, Row, message } from "antd";
import { rules } from "../../constants";
import { login } from "../../services/userService";
import { getCookie, setCookie } from "../../helpers/cookie";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthen } from "../../actions/authen";

function Login() {
  const token = getCookie("token");
  const [mess, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = async (values) => {
    const result = await login(values.email, values.password);
    if (result.length > 0) {
      console.log(result);
      const { id, fullName, email, token } = result[0];
      setCookie("id", id, 1);
      setCookie("email", email, 1);
      setCookie("fullName", fullName, 1);
      setCookie("token", token, 1);
      dispatch(checkAuthen(true));
      navigate("/");
    } else {
      mess.error("Email hoặc mật khẩu không chính xác");
    }
  };

  return (
    <>
      {contextHolder}

      {token ? (
        <>
          <Navigate to="/" />
        </>
      ) : (
        <>
          <Row align="center" style={{ marginTop: 50 }}>
            <Col span={12}>
              <Card title="Login quiz">
                <Form layout="vertical" onFinish={handleFinish}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={rules}
                    initialValue="test@gmail.com"
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={rules}
                    initialValue="123"
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
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
      )}
    </>
  );
}
export default Login;
