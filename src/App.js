import { useEffect } from "react";
import Tab from "./Tab";
import { useGlobalContext } from "./context";
import Modal from "./Modal";
import { message } from "antd";

function App() {
  const { list, setList, toDo, setTodo, detail, setDetail, listDone } =
    useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(toDo && detail)) {
      message.error("please enter value");
    } else {
      message.success("Add to do is success");
      const newItem = {
        id: new Date().getTime().toString(),
        title: toDo,
        description: detail,
      };
      setTodo("");
      setDetail("");
      setList([...list, newItem]);
      console.log("check list", list);
    }
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  useEffect(() => {
    localStorage.setItem("listDone", JSON.stringify(listDone));
  }, [listDone]);
  return (
    <>
      <section className="section-center">
        <div class="container">
          <h2 class="title">
            <span class="title-word title-word-1">My</span>
            <span class="title-word title-word-2">to</span>
            <span class="title-word title-word-3">do</span>
            <span class="title-word title-word-4">list </span>
          </h2>
        </div>
        <form className="grocery-form" onSubmit={handleSubmit}>
          <div className="form-control">
            <input
              value={toDo}
              type="text"
              className="grocery"
              placeholder="list to do..."
              onChange={(e) => setTodo(e.target.value)}
            />

            <input
              value={detail}
              type="text"
              className="grocery"
              placeholder="detail to do..."
              onChange={(e) => setDetail(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              submit
            </button>
          </div>
        </form>

        <Tab />
        <Modal />
      </section>
    </>
  );
}

export default App;
