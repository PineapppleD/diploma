import React from 'react';
import { IQuizQuestion } from '../../models';

interface QuizQuestionProps {
    question: IQuizQuestion;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ question }) => {
    return (
        <div>
            <h2>{question.question}</h2>
            <ul>
                {question.options.map((option, index) => (
                    <li key={index}>{option}</li>
                ))}
            </ul>
        </div>
    );
};

export default QuizQuestion;
