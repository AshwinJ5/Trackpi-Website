import React, { useState } from "react";
import ToolCard from "./ToolCard";
import "./Voucherpage.css";

const toolsData = [
  {
    title: "My ToDo’s",
    subtitle: "To Do App",
    description:
      "My ToDo’s helps you stay organized, boost productivity and enhance team collaboration with effective task management and reminders.",
    logo: "/assets/images/trackpi_logo.png",
  },
  {
    title: "HabitSnc",
    subtitle: "Habit Tracker",
    description:
      "Build and maintain positive habits with progress tracking and stay motivated in building positive habits for Your growth.",
    logo: "/assets/images/trackpi_logo.png",
  },
  {
    title: "Expenzor",
    subtitle: "Personal Expense Tracker",
    description:
      "Expenzor lets you easily manage and categorize expenses, providing insights to help with budgeting.",
    logo: "/assets/images/trackpi_logo.png",
  },
  {
    title: "DayLog",
    subtitle: "Digital Diary / Journal",
    description:
      "Securely record thoughts, notes, and important events, Maintain personal or work-related notes.",
    logo: "/assets/images/trackpi_logo.png",
  },
];

const Cards = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(toolsData.length).fill(false)
  );

  const handleCheckboxChange = (index) => {
    const updatedCheckedState = checkedState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <div className="mt-10 px-4 w-full max-w-4xl mx-auto">
      <div className="bg-[#0A0A0A33] rounded-2xl p-10">
        <h2 className="text-lg font-bold text-center sm:text-xl lg:text-2xl">
          Exclusive Employee Engagement Tools
        </h2>
        <div className="text-gray-700 mt-2 sm:mt-0 sm:ml-12 text-right">
          {checkedState.filter(Boolean).length} / {toolsData.length} Selected
        </div>

        <div className="grid gap-5 mt-6">
          {toolsData.map((tool, index) => (
            <ToolCard
              key={index}
              {...tool}
              isChecked={checkedState[index]}
              onCheckboxChange={() => handleCheckboxChange(index)}
            />
          ))}
        </div>

        <p className="text-center text-gray-800 mt-6 px-4 sm:px-10 md:px-20">
          The apps will be branded with your company logo and customized color
          theme for employee use.
        </p>
      </div>

      <div className="rounded-lg p-6 mt-6">
        <div className="flex justify-end">
          <input type="checkbox" className="w-5 h-5 border rounded mr-2" />
          <label className="text-gray-900 text-sm font-medium">
            I don’t want any complimentary gift
          </label>
        </div>

        <div className="mt-6 bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <div className="space-y-4 text-center">
            <div className="flex items-center justify-center">
              <input type="checkbox" className="w-5 h-5 border rounded mr-2" />
              <label className="text-gray-900 text-sm">
                By registering, I agree to the terms and conditions.
              </label>
            </div>
            <div className="flex items-center justify-center">
              <input type="checkbox" className="w-5 h-5 border rounded mr-2" />
              <label className="text-gray-900 text-sm">
                I consent to receive updates and promotional emails.
              </label>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button className="bg-gradient-to-r from-[#FEDC3F] to-[#FE8900] text-white font-bold py-2 px-6 rounded-md">
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
