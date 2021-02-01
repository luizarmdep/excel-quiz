import React from 'react';
import db from '../../db.json';
import Head from 'next/head';
import Footer from '../../src/components/Footer';
import GitHubCorner from '../../src/components/GitHubCorner';
import QuizLogo from '../../src/components/QuizLogo';
import QuizBackground from '../../src/components/QuizBackground';
import QuizContainer from '../../src/components/QuizContainer';
import Widget from '../../src/components/Widget';
import Button from '../../src/components/Button';
import AlternativesForm from '../../src/components/AlternativesForm';
import BackLinkArrow from '../../src/components/BackLinkArrow';

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT'
}; 

function LoadingWidget(){
    return (
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>
        </Widget>
    );
}

function ResultWidget({ results }){
    const totalQuestions = db.questions.length;
    return (
        <Widget>
            <Widget.Header>
                {`Você acertou 
                    ${results.reduce((somatoriaAtual, resultAtual) => {
                        const isAcerto = resultAtual === true;
                        if (isAcerto) {
                            return somatoriaAtual +1;
                        }
                        return somatoriaAtual;
                    }, 0)} 
                    / ${totalQuestions} perguntas. Parabéns! `}
            </Widget.Header>
            <Widget.Content>
                <ul> 
                    {results.map((result, index) => (
                        <li key={`result__${result}`}>
                            Pergunta {index + 1}: {result === true ? 'Acertou' : 'Errou'}
                        </li>
                    ))}
                </ul>
            </Widget.Content>
        </Widget>
    );
}

function QuestionWidget({
    question, 
    totalQuestions, 
    questionIndex,
    onSubmit,
    addResult
}) {
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined);
    const [isQuestionSubmitted, setIsQuestionSubmitted] = React.useState(false);
    const isAlternativeSelected = selectedAlternative !== undefined;
    const questionId = `question__${questionIndex}`;
    const isCorrect = selectedAlternative === question.answer;
    return (
        <Widget>
            <Widget.Header> 
                <BackLinkArrow href="/"/>
                <h3> 
                    {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
                </h3>
            </Widget.Header> 
            <img 
                alt="Descrição"
                style={{
                    width:'100%',
                    height: '150px',
                    objectFit:'cover',
                }}
                src={question.image}
            />
            <Widget.Content> 
                <h2> 
                    {question.title} 
                </h2>
                <p> 
                    {question.description} 
                </p>

                <AlternativesForm 
                    onSubmit={(event) =>{
                        event.preventDefault();
                        setIsQuestionSubmitted(true);
                        setTimeout(() => {
                            addResult(isCorrect);
                            onSubmit();
                            setSelectedAlternative(undefined);
                            setIsQuestionSubmitted(false);
                        }, 3 * 1000);
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'; 
                        const isSelected = selectedAlternative === alternativeIndex;
                        return (
                            <Widget.Topic
                                as="label"
                                key={alternativeId}
                                htmlFor = {alternativeId}
                                data-status = {isQuestionSubmitted && alternativeStatus}
                                data-selected = {isSelected}
                    
                            >
                                <input
                                    style={{display: 'none'}}
                                    id={alternativeId}
                                    name = {questionId}
                                    onChange={() => setSelectedAlternative(alternativeIndex)}
                                    type='radio'
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}

                    <Button type="submit" disabled={!isAlternativeSelected} >
                        BOTO FÉ QUE TÁ CERTO!
                    </Button>

                    {isQuestionSubmitted && isCorrect && <p> Você acertou! </p>}
                    {isQuestionSubmitted && !isCorrect && <p> Você errou! </p>}

                </AlternativesForm>
{/* 
                {isQuestionSubmitted && 
                    <Button type="submit">
                        BORA PRA PRÓXIMA!
                    </Button>
                } */}
            </Widget.Content>
        </Widget>
    );
}

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const [results, setResults]=React.useState([]);
    const totalQuestions = db.questions.length;
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const question = db.questions[questionIndex];

    function addResult(result) {
        setResults([
            ...results,
            result,
        ]);
    }

    // Ciclo de vida de componentes React
        // nasce === didMount
        // atualiza === willUpdate
        // morre === willUnmount
    // Cada etapa do ciclo pode receber ações -> Effects 
    // Esses nomes (didMount, willUnmount etc.) eram usados quando React usava classes
    // Agora com hooks, usamos useEffect
    React.useEffect(() => {
        setTimeout(() => {
           setScreenState(screenStates.QUIZ);
        }, 1 * 1000);
    }, []);

    function handleSubmitQuiz() {
        const nextQuestion = questionIndex + 1;
        if( nextQuestion < totalQuestions) {
           setQuestionIndex(questionIndex + 1);
        } else {
            setScreenState(screenStates.RESULT)
        }
    }


    return (
        <QuizBackground backgroundImage={db.bg}> 
        <Head>
          <title> Excel Quiz </title>
        </Head>
        <QuizContainer>

          <QuizLogo/>
          {screenState === screenStates.QUIZ && (
            <QuestionWidget 
                question={question}
                questionIndex={questionIndex}
                totalQuestions={totalQuestions}
                onSubmit={handleSubmitQuiz}
                addResult={addResult}
            />
          )}

          {screenState === screenStates.LOADING && <LoadingWidget/>} 
          {screenState === screenStates.RESULT && <ResultWidget results={results} /> }

          <Footer> </Footer>

        </QuizContainer>
  
        <GitHubCorner projectUrl="https://github.com/luizarmdep"/>

      </QuizBackground>
    );
  }