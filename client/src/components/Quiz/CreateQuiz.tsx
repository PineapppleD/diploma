import React, { useState } from "react";
import { IQuizQuestion, IQuiz, IContest } from "../../models";
import CreateQuizQuestion from "./CreateQuizQuestion";
import { addContest } from "../../firebase/contestOperations";

type Props = {
  name: string;
}

const CreateQuiz = ({name}: Props) => {
  const [questions, setQuestions] = useState<IQuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<IQuizQuestion | null>(
    null
  );

  const handleQuestionSubmit = (question: IQuizQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
    console.log(currentQuestion);
    setCurrentQuestion(null);
  };

  const handleSubmit = () => {
    // Create a new quiz object
    const newQuiz: IQuiz = {
      questions,
    };

    const currentContestString = localStorage.getItem('incompletedContests') as string;
    const contests = JSON.parse(currentContestString);
    const currentContest = contests.find((item:any) => item.name === name)

    const { description, start, end, max_participants, category, contestType } = currentContest;
    addContest(name, description, start, end, max_participants, category, contestType, newQuiz.questions)
    const updatedContests = contests.filter((item: any) => item.name !== name)
    localStorage.setItem('incompletedContests', JSON.stringify(updatedContests));
    
    // Clear form fields
    setQuestions([]);
  };

  return (
    <div>
      <div>
        {currentQuestion ? (
          <div>
            <CreateQuizQuestion onQuestionSubmit={handleQuestionSubmit} />
            <button type="button" onClick={() => setCurrentQuestion(null)}>
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              setCurrentQuestion({
                question: "",
                options: ["", "", ""],
                correctAnswer: "",
              })
            }
          >
            Add Question
          </button>
        )}
      </div>

      <h3>Questions</h3>
      {questions.map((question, index) => (
        <div key={index}>
          <p>
            {index + 1}
            {question.question}
          </p>
          {/* Render question options or any other relevant information */}
        </div>
      ))}

      <button onClick={handleSubmit}>Create Quiz</button>
    </div>
  );
};

export default CreateQuiz;
