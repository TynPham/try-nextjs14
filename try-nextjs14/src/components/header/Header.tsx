"use client";

import React, { useState } from "react";
import { MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const items: MenuProps["items"] = [
  {
    label: <Link href={"/"}>Home</Link>,
    key: "home",
    icon: <MailOutlined />,
  },
  {
    label: <Link href={"/user"}>User</Link>,
    key: "user",
    icon: <MailOutlined />,
  },
  {
    label: <Link href={"/blog"}>Blog</Link>,
    key: "blog",
    icon: <MailOutlined />,
  },
];

const Header: React.FC = () => {
  const pathname = usePathname();
  const [current, setCurrent] = useState(pathname.slice(1) || "home");

  const onClick: MenuProps["onClick"] = (e: any) => {
    setCurrent(e.key);
  };

  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default Header;
