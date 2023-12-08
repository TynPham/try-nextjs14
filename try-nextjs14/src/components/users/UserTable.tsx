"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, PaginationProps, Space, Table, Tag, message } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { usePathname, useRouter } from "next/navigation";
import ModalCreate from "./ModalCreate";
import { deleteUser, getDetailsUser } from "@/actions/users.actions";
import { User, UserBody } from "@/types/users.type";

export type DataType = User;

const columns: ColumnsType<DataType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
];

const UserTable: React.FC<{
  users: DataType[];
  meta: {
    total: number;
    current: number;
    pageSize: number;
  };
}> = ({ users, meta }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<User | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const pathname = usePathname();
  const newColumns: ColumnsType<DataType> = [...columns];
  newColumns.push({
    title: "Action",
    key: "action",
    render: (text, record, index) => (
      <Space size="middle">
        <a
          onClick={(e) => {
            e.stopPropagation();
            handleEdit(record.id);
          }}
        >
          Edit
        </a>
        <a
          onClick={async (e) => {
            e.stopPropagation();
            handleDelete(record.id);
          }}
        >
          Delete
        </a>
      </Space>
    ),
  });

  useEffect(() => {
    setIsFetching(false);
  }, [users]);

  const onChangePagination = (pagination: TablePaginationConfig) => {
    const params = new URLSearchParams();
    params.set("page", String(pagination.current));
    router.replace(`${pathname}?${params.toString()}`);
    setIsFetching(true);
  };

  const renderHeader = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Table List Users</span>
        <Button type="primary" onClick={() => setOpenModal(true)}>
          + Add user
        </Button>
      </div>
    );
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Delete users",
      content: "Are you sure?",
      cancelButtonProps: { disabled: isFetching },
      onOk: async () => {
        setIsFetching(true);
        await deleteUser(id);
        setIsFetching(false);
        messageApi.success("Delete user successfully!");
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  };

  const handleEdit = async (id: number) => {
    const user = await getDetailsUser(id);
    setDataForm(user);
    setOpenModal(true);
  };
  return (
    <>
      {contextHolder}
      <Table
        title={renderHeader}
        columns={newColumns}
        dataSource={users || []}
        rowKey="id"
        onRow={(row: DataType) => ({
          onClick: () => router.push(`/user/${row.id}`),
        })}
        pagination={{
          ...meta,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
        }}
        onChange={onChangePagination}
      />
      <ModalCreate openModal={openModal} setOpenModal={setOpenModal} dataForm={dataForm} setDataForm={setDataForm} />
    </>
  );
};

export default UserTable;
