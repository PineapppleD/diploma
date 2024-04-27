import React from 'react';
import { IQuizQuestion } from '../../models';

interface QuizQuestionProps {
    question: IQuizQuestion;
    selectedOption: string | null;
    onOptionChange:  (option: string) => void
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question, selectedOption, onOptionChange }) => {

    return (
        <div>
            <h2>{question.question}</h2>
            <ul>
                {question.options.map((option, index) => (
                    <li key={index}>
                        <label>
                            <input
                                type="radio"
                                value={option}
                                checked={selectedOption === option}
                                onChange={() => onOptionChange(option)}
                            />
                            {option}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuizQuestion;
