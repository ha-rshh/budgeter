import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

const App = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editItemId, setEditItemId] = useState("");


  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = () => {
    {
      amount,
        description,
        date === ""
          ? alert("Please fill all the fields")
          : setData((prevData) => [
              {
                id: editMode
                  ? editItemId
                  : `${Math.round(Math.random() * 1000)}`,
                amount,
                description,
                date,
              },
              ...prevData.filter((item) => item.id !== editItemId),
            ]);
    }
    setAmount("");
    setDescription("");
    setDate("");
  };
 
 const handleEdit = (id) => {
   const editItem = data.find((item) => item.id === id);
   if (editItem) {
     setAmount(editItem.amount);
     setDescription(editItem.description);
     setDate(editItem.date);
     setEditMode(true);
     setEditItemId(id);
   }
 };
  const handleDel = (id) => {
    setData((prevData) => {
      return prevData.filter((item) => item.id !== id);
    });
  };
  return (
    <>
      <Navbar />
      <div className="form-layout">
        <input
          type="tel"
          maxLength="8"
          placeholder="Enter Amount"
          required
          onChange={handleAmount}
          value={amount}
          pattern="/^-?\d+\.?\d*$/"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={handleDescription}
          required
          maxLength={180}
        />
        <input
          type="date"
          value={date}
          onChange={handleDate}
          max="3000-12-31"
          required
        />
        <button onClick={handleSubmit}>SAVE</button>
      </div>

      <div className={"list-layout"}>
        {data.map((item, index) => (
          <div key={index} className="list">
            <div className="amount">
              <h2>{item.amount}</h2>
            </div>
            <div className="description">
              <p>{item.description}</p>
            </div>
            <div className="date">
              <div className="btn">
                <button className="del" onClick={() => handleDel(item.id)}>
                  ❌
                </button>
                <button className="edit" onClick={() => handleEdit(item.id)}>
                  ✏️
                </button>
              </div>
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
