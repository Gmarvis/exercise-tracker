import React, { useState } from "react";
import Form from "../components/form";
import axios from "axios";

const userURL = process.env.REACT_APP_USER_URL;
const exerciseUrl = process.env.REACT_APP_EXERCISE_URL;

// console.log("user url : ", userURL);

const ExerciseTracker = () => {
  const [user, setUser] = useState({
    username: "",
  });

  const [exercise, setExercise] = useState({
    userId: "",
    description: "",
    duration: 0,
    date: null,
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    axios
      .post(userURL, {
        user,
      })
      .then((res) => {
        const createdUser = res.data;
        console.log(createdUser);
        window.open(userURL + "/" + createdUser._id, '_blank');
      });
  };

  // handle add exersise change
  const handelChange = (event) => {
    const { name, value } = event.target;

    setExercise({
      ...exercise,
      [name]: value,
    });
  };

  // add Excersies
  const handleAddExercise = (e) => {
    e.preventDefault();
    axios
      .post(exerciseUrl, {
        exercise,
      })
      .then((res) => {
        const createdExercises = res.data;
        console.log("createdExercises: ", createdExercises);
        console.log(exerciseUrl + "/" + createdExercises.userId + "/exercises")
        window.open(exerciseUrl + "/" + createdExercises.userId + "/exercises", '_blank')
      })

      .catch((err) => {
        console.log("there was an error tying to add new exercise: ", err);
      });
  };

  return (
    <div>
      <h1>Exercise tracker</h1>
      <div className="container">
        <Form
          title="Create a New User"
          subtitle="POST /api/users"
          handleAddUser={handleAddUser}
        >
          <input
            type="text"
            name=""
            id=""
            placeholder="username"
            onChange={(e) => setUser({ username: e.target.value })}
          />
        </Form>

        <Form
          title="Add ecxercises"
          subtitle="POST /api/users/:_id/ecxercises"
          handleAddUser={handleAddExercise}
        >
          <input
            type="text"
            placeholder=":_id"
            name="userId"
            onChange={handelChange}
          />
          <input
            type="text"
            placeholder="description"
            name="description"
            onChange={handelChange}
          />
          <input
            type="number"
            placeholder="duration*(min)"
            name="duration"
            onChange={handelChange}
          />
          <input
            type="text"
            name="date"
            placeholder="data (yyyy-mm-dd)"
            onChange={handelChange}
          />
        </Form>
      </div>
    </div>
  );
};

export default ExerciseTracker;
