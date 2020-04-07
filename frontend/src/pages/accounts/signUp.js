import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Form, Input, Button, notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
// import Axios from "axios";
import { axiosInstance } from "api";

// const SignUp = () => {
//   const history = useHistory();
//   const [inputs, setInputs] = useState({ username: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [formDisabled, setFormDisabled] = useState(true);
//   //   const [username, setUsername] = useState("");
//   //   const [password, setPassword] = useState("");

//   const onSubmit = e => {
//     e.preventDefault();

//     setLoading(true);
//     setErrors({});

//     Axios.post("http://localhost:8000/accounts/signup/", inputs)
//       .then(response => {
//         console.log(response);
//         history.push("/accounts/login");
//       })
//       .catch(error => {
//         console.log(error);
//         if (error.response) {
//           setErrors({
//             username: error.response.data.username || [].join(" "),
//             password: error.response.data.password || [].join(" ")
//           });
//           //   console.log("error.response : " + error.response);
//         }
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   useEffect(() => {
//     const isEnabled = Object.values(inputs).every(s => s.length > 0);
//     // const isDisabled =
//     //   inputs.username.length === 0 || inputs.password.length === 0;
//     setFormDisabled(!isEnabled);
//   }, [inputs]);

//   const onChange = e => {
//     const { name, value } = e.target;
//     setInputs(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <div>
//           <input type="text" name="username" onChange={onChange} />
//           {errors.username && <Alert type="error" message={errors.username} />}
//         </div>
//         <div>
//           <input type="password" name="password" onChange={onChange} />
//           {errors.password && <Alert type="error" message={errors.password} />}
//         </div>

//         <input
//           type="submit"
//           value="회원가입"
//           disabled={loading || formDisabled}
//         />
//       </form>
//     </div>
//   );
// };

const SignUp = () => {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

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

  // Ant Design에서의 onFinish가 onSubmit의 역할을 한다.
  const onFinish = values => {
    // async, await : async로 선언된 함수에서 코드가 나열된 순서대로 수행된다.
    async function fn() {
      const { username, password } = values;

      setFieldErrors({});

      const data = { username, password };
      try {
        await axiosInstance.post("/accounts/signup/", data);

        notification.open({
          message: "회원가입 성공",
          description: "로그인 페이지로 이동합니다.",
          icon: <SmileOutlined style={{ color: "#108ee0" }} />
        });

        // 회원가입에 성공하면 로그인 페이지로 이동
        history.push("/accounts/login");
      } catch (error) {
        if (error.response) {
          notification.open({
            message: "회원가입 실패",
            description: "아이디/암호를 확인해주세요.",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });
          const { data: fieldsErrorMessages } = error.response; // fieldsErrorMessages = error.response.data와 같은 표현
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
  return (
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
  );
};

export default SignUp;
