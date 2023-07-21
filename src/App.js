import React from 'react';
import './App.css';
import HomePage from './routes/HomePage';
import SignInPage from './routes/SignInPage';
import SignUpPage from './routes/SignUpPage';
import { Routes, Route } from "react-router-dom";
import TodayMainPage from "./routes/today/TodayMainPage";
import CalendarMainPage from "./routes/calendar/CalendarMainPage";
import GoalMainPage from "./routes/goal/GoalMainPage";
import CalendarDetailPage from "./routes/calendar-detail/CalendarDetailPage";

import "./App.css"

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        {/* home */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/signin" element={<SignInPage/>} /> 
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/today/" element={<TodayMainPage />} />
        <Route path="/calendar/" element={<CalendarMainPage />} />
        <Route path="/goal/" element={<GoalMainPage />} />
        <Route
          path="/calendar/:selectedDate"
          element={<CalendarDetailPage />}
        />
      </Routes>
    </div>
  );
};

export default App;