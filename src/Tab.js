import { DashboardOutlined, CheckOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";
import Table from "./TableToDo";
import TableDone from "./TableDoneToDo";
import { useGlobalContext } from "./context";

const Tab = () => {
  const { list, listDone, clearList, clearListDone } = useGlobalContext();
  return (
    <Tabs
      defaultActiveKey="1"
      items={[DashboardOutlined, CheckOutlined].map((Icon, i) => {
        const id = String(i + 1);
        let tabName;
        let data;
        if (i === 0) {
          tabName = "Doing";
          data = list.length ? (
            <div>
              <Table />
              <button className="clear-btn" onClick={clearList}>
                clear items
              </button>
            </div>
          ) : (
            <h3>You Have Not To Do</h3>
          );
        }
        if (i === 1) {
          tabName = "Done";
          data = listDone.length ? (
            <div>
              <TableDone />
              <button className="clear-btn" onClick={clearListDone}>
                clear items
              </button>
            </div>
          ) : (
            <h3>you have not completed to do ! try hard</h3>
          );
        }

        return {
          label: (
            <span>
              <Icon />
              {tabName}
            </span>
          ),
          key: id,
          children: data,
        };
      })}
    />
  );
};

export default Tab;
