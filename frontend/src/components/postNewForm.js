import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Upload, Modal, notification } from "antd";
import { PlusOutlined, FrownOutlined } from "@ant-design/icons";
import getBase64FromFile from "utils/base64";
import parseErrorMessages from "utils/forms";
import Axios from "axios";
import { useAppContext } from "store";

const PostNewForm = () => {
  const {
    store: { jwtToken }
  } = useAppContext();

  const history = useHistory();

  const [fileList, setFileList] = useState([]);
  const [previewPhoto, setPreviewPhoto] = useState({
    visible: false,
    base64: null
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const handleFinish = async fieldValues => {
    console.log("fielValues:::" + fieldValues);
    const {
      caption,
      location,
      photo: { fileList }
    } = fieldValues;

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);

    // file이 여러개일 수도 있음
    fileList.forEach(file => {
      formData.append("photo", file.originFileObj);
    });

    const headers = { Authorization: `JWT ${jwtToken}` };
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/posts/",
        formData,
        { headers }
      );
      console.log("success response:::" + response);
      history.push("/");
    } catch (error) {
      if (error.response) {
        const { status, data: fieldsErrorMessage } = error.response;
        if (typeof fieldsErrorMessage === "string") {
          notification.open({
            message: "서버 오류",
            description: `에러) ${status} 응답을 받았습니다.`,
            icon: <FrownOutlined style={{ color: "#ff3333" }} />
          });
        } else {
          setFieldErrors(parseErrorMessages(fieldsErrorMessage));
        }
      }
    }
  };
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handlePreviewPhoto = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj);
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview
    });
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
    <Form
      {...layout}
      onFinish={handleFinish}
      //   onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Caption"
        name="caption"
        rules={[
          {
            required: true,
            message: "Caption을 입력해주세요."
          }
        ]}
        hasFeedback
        {...fieldErrors.caption}
        {...fieldErrors.non_field_errors}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        label="Location"
        name="location"
        rules={[
          {
            required: true,
            message: "Location 입력해주세요."
          }
        ]}
        hasFeedback
        {...fieldErrors.location}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 입력해주세요." }]}
        hasFeedback
        {...fieldErrors.photo}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploadChange}
          onPreview={handlePreviewPhoto}
        >
          {/* 사진을 1개만 넣기위한 조건 */}
          {fileList.length > 0 ? null : (
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <Modal
        visible={previewPhoto.visible}
        footer={null}
        onCancel={() => setPreviewPhoto({ visible: false })}
      >
        <img
          src={previewPhoto.base64}
          style={{ width: "100%" }}
          alt="Preview"
        />
      </Modal>
      <hr />
      {JSON.stringify(fileList)}
    </Form>
  );
};

export default PostNewForm;
