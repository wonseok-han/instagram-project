import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Alert, Form, Input, Button, notification, Card } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import Axios from "axios";
import useLocalStorage from "utils/useLocalStorage";
import { useAppContext } from "store";
import { setToken } from "store";

const Login = () => {
  const { dispatch } = useAppContext();
  const location = useLocation();
  const history = useHistory();
  // const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  const [fieldErrors, setFieldErrors] = useState({});

  const { from: loginRedirectUrl } = location.state || {
    from: { pathname: "/" }
  };

  // Ant Design에서의 onFinish가 onSubmit의 역할을 한다.
  const onFinish = values => {
    // async, await : async로 선언된 함수에서 코드가 나열된 순서대로 수행된다.
    async function fn() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        const response = await Axios.post(
          "http://localhost:8000/accounts/token/",
          data
        );
        // const { data: token } = response; // => const token = response.data;와 같은 의미
        // const {
        //   data: { token }
        // } = response; // => const token = response.data.token;와 같은 의미
        const { data: jwtToken } = response;
        // setJwtToken(jwtToken);
        dispatch(setToken(jwtToken));

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee0" }} />
        });

        // 성공 후 이동경로
        history.push(loginRedirectUrl);
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "로그인 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });
          const { data: fieldsErrorMessages } = error.response;
          //   fieldsErrorMessages => {username: ["m1", "m2"], password: ["p1", "p2"]}
          setFieldErrors(
            Object.entries(fieldsErrorMessages).reduce(
              (acc, [fieldName, errors]) => {
                //   errors : ["m1", "m2"].join(" ") => "m1 m2"
                acc[fieldName] = {
                  validateStatus: "error",
                  help: errors.join(" ")
                };

                return acc;
              },
              {}
            )
          );
        }
      }
    }
    fn();
  };

  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };
  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16
    }
  };

  return (
    <Card title="로그인">
      <Form
        {...layout}
        onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!"
            },
            { min: 5, message: "5글자이상 입력해주세요." }
          ]}
          hasFeedback
          {...fieldErrors.username}
          {...fieldErrors.non_field_errors}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Login;
