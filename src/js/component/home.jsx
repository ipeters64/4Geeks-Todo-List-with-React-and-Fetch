import React from "react";
import { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const apiURL = "http://assets.breatheco.de/apis/fake/todos/user/ipeters123";
  const [task, setTask] = useState([]);
  const [isShown, setIsShown] = useState(-1);
  const [done, setDone] = useState(true)
 
// define tasks using useEffect //
  useEffect(() => {
    fetch(apiURL)
      .then((result) => {
        if (result.status == 200) {
          return result.json();
        }
      })
      .then(setTask(task))
      .catch((err) => err);
  }, []);

  const createUser = function () {
    fetch(apiURL, {
      method: "POST",
      body: JSON.stringify([]),
      headers: { "Content-type": "application/json" },
    });
  };

  const updateTask = function (task) {
    console.log(task);
    fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => console.log("resultado metodo PUT: ", data))
      .catch((err) => err);
  };

  const deleteUser = function (task) {
    fetch(apiURL, {
      method: "DELETE",
      body: JSON.stringify(task),
      headers: { "Content-type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => console.log("result method DELETE: ", data))
      .catch((err) => err);
  };

  const showCheck = () => {
    setDone(true)
  }
  const showItem = () => {
    setDone(false)
  }

  const handleDeleteTask = function (index) {
    const filter = task.filter((item, currentIndex) => {
      return currentIndex !== index;
    });
    setTask(filter);
    updateTask(filter);
  };


  const handleInCompleteTask = (index) => {
    let copyTask = [...task];
    copyTask[index].done = false;
    setTask(copyTask);
    updateTask(copyTask);
  };

  const handleCompletedTask = (index) => {
    let copyTask = [...task];
    copyTask[index].done = true;
    setTask(copyTask);
    updateTask(copyTask);
  };


  const handleDeleteAllTasks = () => {
    setTask([]);
  };

  let style1 = {
    height: "15px",
    backgroundColor: "white",
    zIndex: -1,
  };



  return (
    <div className="text-center container m-auto">
      <div className="row justify-content-center mt-2">
        <div className="shadow p-3 col-12 mt-3 border bg-white rounded">
          <h1 className="text-muted">Todo List</h1>
          <div className="row">
            <div className="col">
              <input
                className="text-dark border-none"
                type="text"
                size={30}
                placeholder="What else should we add?"
                onKeyDown={(item) => {
                  if (item.key == "Enter") {
                    setTask([
                      ...task,
                      { label: item.target.value, done: false },
                    ]);
                  }
                }}
              ></input>
            </div>
            {task.map((item, index) => {
              if (item.label == ""){
                return (
                  <div
                    key={index}
                    className="row mt-1 p-0 border-top"
                    onMouseEnter={() => setIsShown(index)}
                    onMouseLeave={() => setIsShown(-1)}
                  >
                    <div className="col-1"></div>
                    <div className="col-9 mt-3 mb-3 pt-2 pb-2">
                      <div className={`col ${item.done ? "lineClass" : "" }`} id="textList1" >
                        Take a break
                      </div>
                    </div>
                    {isShown == index ? (
                      <div className="col-2 pt-4" key={index}>
                        {done ? <span id="check" onClick={() => {handleCompletedTask(index), showItem()}}>✓</span> : 
                        <span id="check2" onClick={() => {handleInCompleteTask(index), showCheck()}}>✓</span>
                        }<span>   </span>
                        <span id="del" onClick={() => handleDeleteTask(index)}>X</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              } else {
                return (
                  <div
                    key={index}
                    className="row mt-1 p-0 border-top"
                    onMouseEnter={() => setIsShown(index)}
                    onMouseLeave={() => setIsShown(-1)}
                  >
                    <div className={`col-2 mt-4 mb-2 pt-2 pb-2 pl-0 ${item.done ? "fa fa-check" : "" }`}></div>
                    <div className="col-8 mt-3 mb-3 pt-2 pb-2">
                      <div className={`col ${item.done ? "lineClass" : "" }`} id="textList" >
                        {item.label} 
                      </div>
                      
                    </div>
                    {isShown == index ? (
                      <div className="col-2 pt-4" key={index}>
                        {done ? <span id="check" onClick={() => {handleCompletedTask(index), showItem()}}>✓</span> : 
                        <span id="check2" onClick={() => {handleInCompleteTask(index), showCheck()}}>✓</span>
                        }<span>   </span>
                        <span id="del" onClick={() => handleDeleteTask(index)}>X</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                );
              }
              }
             )}
          </div>
          {task.length === 0 ? (
            <div className="row border-top">
              <div className="col-8 mt-2">
                <p> No Items on the list</p>
              </div>
              <div className="col-4"></div>
            </div>
          ) : (
            <div className="row border-top">
              <div className="col-8 mt-2 ">
                <p>{task.length} Items on the list</p>
              </div>
              <div className="col-4">
                <div
                  className="btn btn-warning"
                  onClick={() => handleDeleteAllTasks()}
                >
                  {" "}
                  Delete All Tasks
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className="row mt-0 rounded shadow"
          style={style1}
          id="pages"
        ></div>
        <div
          className="row mt-0 rounded shadow"
          style={style1}
          id="pages1"
        ></div>
      </div>
    </div>
  );
};

export default Home;
