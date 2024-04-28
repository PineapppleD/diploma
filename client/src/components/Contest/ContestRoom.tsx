import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IQuizQuestion } from '../../models';
import { getContestByID } from '../../firebase/contestOperations';
import QuizQuestion from '../Quiz/QuizQuestion';
import { calculateAndUpdatePoints } from '../../firebase/contestOperations'; // Import the function to calculate and update points
import { useUserContext } from '../../contexts/userContext/userContextProvider';
import { calculatePoints } from '../../utilities/calculatePoints';

const ContestRoom: React.FC = () => {
    const {userId} = useUserContext();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<boolean[]>([]);
    const [quizQuestions, setQuizQuestions] = useState<IQuizQuestion[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState<number>(0);
    const [quizEnded, setQuizEnded] = useState<boolean>(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                if (id) {
                    const quizData = await getContestByID(id);
                    if (quizData?.questions) {
                        setQuizQuestions(quizData.questions);
                    } else {
                        console.error('Quiz data or questions not found.');
                    }
                }
            } catch (error) {
                console.error('Error fetching quiz questions:', error);
            }
        };

        fetchQuizQuestions();
    }, [id]);

    useEffect(() => {
        setTimeRemaining(60); // Set initial timer value
    }, [quizQuestions]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (timeRemaining > 0 && !quizEnded) {
                setTimeRemaining(prevTime => prevTime - 1);
            } else {
                clearInterval(timer);
                setQuizEnded(true);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [timeRemaining, quizEnded]);

    const currentQuestion: IQuizQuestion | undefined = quizQuestions[currentQuestionIndex];

    const handleNextQuestion = () => {
        // Check if the selected option matches the correct answer
        const isCorrect = selectedOption === currentQuestion.correctAnswer;
        // Update userAnswers array with the result
        setUserAnswers(prevAnswers => [...prevAnswers, isCorrect]);

        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            setSelectedOption(null);
        } else {
            // End the quiz
            setQuizEnded(true);
            console.log(userAnswers);
            const pointsEarned = calculatePoints(userAnswers); // Implement this function to calculate points earned
            console.log(pointsEarned);
            if (pointsEarned > 0 && id && userId) {
                calculateAndUpdatePoints(id, userId, pointsEarned); // Update participant's points
            }
        }
    };
    

    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
    };

    return (
        <div>
            {!quizEnded && currentQuestion && (
                <QuizQuestion
                    question={currentQuestion}
                    selectedOption={selectedOption}
                    onOptionChange={handleOptionChange}
                />
            )}
            
            {!quizEnded && (
                <button onClick={handleNextQuestion}>
                    Next
                </button>
            )}

            <div>Time Remaining: {timeRemaining} seconds</div>

            {quizEnded && <p>End of Quiz</p>}
        </div>
    );
};

export default ContestRoom;
