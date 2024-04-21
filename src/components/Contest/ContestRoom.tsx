import { useState, useEffect } from 'react'
import { IQuizRoom, IQuizQuestion } from '../../models';
import { getContestByID } from '../../firebase/contestOperations';
import QuizQuestion from '../Quiz/QuizQuestion';

interface QuizRoomProps {
    quizRoom?: IQuizRoom;
}

const ContestRoom: React.FC<QuizRoomProps> = ({ quizRoom }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<string[]>([]);
    const [timeRemaining, setTimeRemaining] = useState(quizRoom?.timer);
    const [quizQuestions, setQuizQuestions] = useState<IQuizQuestion[]>([]);

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                if (quizRoom) {
                    const quizData = await getContestByID(quizRoom.quizId);
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
    }, [quizRoom?.quizId]);

    const currentQuestion: IQuizQuestion = quizQuestions[currentQuestionIndex];

    return (
         <div>
            {/* Render the QuizQuestion component with the current question */}
            {currentQuestion && <QuizQuestion question={currentQuestion} />}
            <p>DIas</p>
        </div>
    );
};

export default ContestRoom;
