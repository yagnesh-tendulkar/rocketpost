import { Layout, Select } from "antd";
import React from "react";
import { Text } from "../../common/locale/script";
import MiracleLogo from "../../assets/Miracle-Logo-White.png"
import { useDispatch, useSelector } from "react-redux";
import { switchLocale } from "../../features/locale/localeSlice";
const { Header } = Layout;

function AppHeader() {
  const locale = useSelector((state) => state.locale.value)
  const dispatch = useDispatch()
  return (
    <Header className="flex items-center justify-between bg-miracle-dark-blue">
      <div className=" rounded-[6px] mr-5">
        <h2 className="text-miracle-white text-3xl font-bold">Send Post</h2>
      </div>

    </Header>
  );
}

export default AppHeader;
