import React, { useState } from 'react';
import { IQuizQuestion } from '../../models';

type Props = {
    onQuestionSubmit: (question: IQuizQuestion) => void;
}

export default function CreateQuizQuestion({ onQuestionSubmit }: Props) {
    
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('form submitted')
        // Basic validation
        if (!question.trim() || !options.every(option => option.trim()) || !correctAnswer.trim()) {
            alert('Please fill in all fields');
            return;
        }

        // Check if the correct answer is one of the options
        if (!options.includes(correctAnswer)) {
            alert('The correct answer must be one of the options');
            return;
        }

        // Create a new question object
        const newQuestion: IQuizQuestion = {
          question,
          options,
          correctAnswer,
        };

        // Call the onQuestionSubmit callback with the new question
        onQuestionSubmit(newQuestion);

        // Clear options only
        setOptions(['', '', '', '']);
        setQuestion('');
        setCorrectAnswer('');
    };

    const addOption = () => {
        setOptions(prevOptions => [...prevOptions, '']);
    };

    const removeOption = (index: number) => {
        setOptions(prevOptions => prevOptions.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Question:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </div>
            <div>
                <label>Options:</label>
                {options.map((option, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => {
                                const updatedOptions = [...options];
                                updatedOptions[index] = e.target.value;
                                setOptions(updatedOptions);
                            }}
                        />
                        <button type="button" onClick={() => removeOption(index)}>-</button>
                    </div>
                ))}
                <button type="button" onClick={addOption}>Add Option</button>
            </div>
            <div>
                <label>Correct Answer:</label>
                <input
                    type="text"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                />
            </div>
            <button type="submit">Add Question</button>
        </form>
    );
}
