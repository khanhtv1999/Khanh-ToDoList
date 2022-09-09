import React from "react";
import { useGlobalContext } from "./context";
import { message, Modal, Input } from "antd";

const ModalEdit = () => {
  const {
    closeModal,
    editDetail,
    editID,
    list,
    setList,
    open,
    setOpen,
    setEditToDo,
    editToDo,
    setEditDetail,
  } = useGlobalContext();

  const handleEdit = () => {
    if (!(editToDo && editDetail)) {
      message.error("please enter value");
    } else {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: editToDo, description: editDetail };
          }
          return item;
        })
      );
      closeModal();
      setOpen(false);
      message.success("Edit to do success ");
    }
  };

  return (
    <div>
      <Modal
        title="Edit my to do"
        centered
        open={open}
        onOk={() => handleEdit()}
        onCancel={() => setOpen(false)}
        width={800}
      >
        <Input
          value={editToDo}
          className="input-ant"
          onChange={(e) => setEditToDo(e.target.value)}
        />
        <Input
          value={editDetail}
          className="input-ant"
          onChange={(e) => setEditDetail(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ModalEdit;
