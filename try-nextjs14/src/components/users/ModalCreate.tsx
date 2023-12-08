"use client";

import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Modal, message } from "antd";
import { createUser, updateUser } from "@/actions/users.actions";
import { useForm } from "antd/es/form/Form";
import { User, UserBody } from "@/types/users.type";

type FieldType = UserBody;

const ModalCreate: React.FC<{
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  dataForm: User | null;
  setDataForm: React.Dispatch<React.SetStateAction<User | null>>;
}> = ({ openModal, setOpenModal, dataForm, setDataForm }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const onFinish = async (values: UserBody) => {
    setIsLoading(true);
    if (dataForm) {
      await updateUser(values, dataForm.id);
      messageApi.success("Update user successfully!");
      setDataForm(null);
    } else {
      await createUser(values);
      messageApi.success("Create user successfully!");
    }
    setIsLoading(false);
    handleCancel();
    form.resetFields();
  };

  useEffect(() => {
    if (form && dataForm) {
      form.setFieldsValue(dataForm);
    }
  }, [dataForm]);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const handleCancel = () => {
    setOpenModal(false);
    form.resetFields();
    setDataForm(null);
  };
  return (
    <>
      {contextHolder}
      <Modal title="Basic Modal" open={openModal} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 3 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType> label="Name" name="name" rules={[{ required: true, message: "Please input your name!" }]}>
            <Input />
          </Form.Item>
          <Form.Item<FieldType> label="Email" name="email" rules={[{ required: true, message: "Please input your email!" }]}>
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 3 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreate;
