"use client";

import React from "react";
import { Card, Space } from "antd";
import { DataType } from "./UserTable";

const UserDetails: React.FC<{ user: DataType }> = ({ user }) => (
  <Space direction="vertical" size={16}>
    <Card size="small" title={user.name} extra={<a href="#">More</a>} style={{ width: 300 }}>
      <p>{user.email}</p>
    </Card>
  </Space>
);

export default UserDetails;
