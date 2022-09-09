import React, { useState, useContext } from "react";
import { message } from "antd";

const AppContext = React.createContext();
const AppProvider = ({ children }) => {
  const getLocalStorageList = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return (list = JSON.parse(localStorage.getItem("list")));
    } else {
      return [];
    }
  };

  const getLocalStorageListDone = () => {
    let list = localStorage.getItem("listDone");
    if (list) {
      return (list = JSON.parse(localStorage.getItem("listDone")));
    } else {
      return [];
    }
  };
  const [list, setList] = useState(getLocalStorageList());
  const [listDone, setListDone] = useState(getLocalStorageListDone());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editID, setEditID] = useState(null);
  const [editToDo, setEditToDo] = useState(null);
  const [editDetail, setEditDetail] = useState(null);
  const [toDo, setTodo] = useState("");
  const [detail, setDetail] = useState("");
  const [valueTodo, setValueTodo] = useState("");
  const [valueDetail, setValueDetail] = useState("");
  const [open, setOpen] = useState(false);

  const editItem = (id) => {
    console.log(id);
    const ItemEdit = list.find((item) => item.id === id);
    setEditID(id);
    // openModal();
    setEditToDo(ItemEdit.title);
    setEditDetail(ItemEdit.description);
    setOpen(true);
  };
  const removeItem = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  const removeItemDone = (id) => {
    setListDone(listDone.filter((item) => item.id !== id));
  };
  const clearList = () => {
    setList([]);
  };
  const clearListDone = () => {
    setListDone([]);
  };
  const openModal = () => {
    setValueTodo("");
    setValueDetail("");
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const doneToDos = (id) => {
    const doneToDo = list.filter((item) => item.id === id);
    setListDone([...listDone, ...doneToDo]);

    let newList = list.filter((item) => item.id !== doneToDo[0].id);

    setTimeout(() => {
      setList(newList);
    }, 1000);
    console.log(doneToDo);
    message.success(`Congratulations! Your completion:  ${doneToDo[0].title}`);
  };
  const incompleteToDo = (id) => {
    const completeToDo = listDone.filter((item) => item.id !== id);
    const imcompleteToDo = listDone.find((item) => item.id === id);
    setTimeout(() => {
      setListDone([...completeToDo]);
    }, 500);

    console.log("check incom", incompleteToDo);
    setList([...list, imcompleteToDo]);
    message.warning(
      `Imcomplete! Try to get the to do done: ${imcompleteToDo.title}`
    );
  };

  return (
    <AppContext.Provider
      value={{
        toDo,
        setTodo,
        detail,
        setDetail,
        isModalOpen,
        openModal,
        closeModal,
        list,
        setList,
        doneToDos,
        listDone,
        editItem,
        editID,
        editDetail,
        editToDo,
        removeItem,
        removeItemDone,
        incompleteToDo,
        valueTodo,
        setValueTodo,
        valueDetail,
        setValueDetail,
        open,
        setOpen,
        setEditToDo,
        clearList,
        setEditDetail,
        clearListDone,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
