import React from 'react';
import db from '../db.json';
import Head from 'next/head';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import Button from '../src/components/Button'

function QuestionWidget({
    question, 
    totalQuestions, 
    questionIndex,
    onSubmit
}) {
    const questionId = `question__${questionIndex}`;
    return (
        <Widget>
            <Widget.Header> 
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

                <form 
                    onSubmit={(event) =>{
                        event.preventDefault();
                        onSubmit();
                    }}
                >
                    {question.alternatives.map((alternative, alternativeIndex) => {
                        const alternativeId = `alternative__${alternativeIndex}`;
                        return (
                            <Widget.Topic
                                as="label"
                                htmlFor = {alternativeId}
                            >
                                <input
                                    //style={{display: 'none'}}
                                    id={alternativeId}
                                    name = {questionId}
                                    type='radio'
                                />
                                {alternative}
                            </Widget.Topic>
                        );
                    })}

                    <Button type="submit">
                        BOTO FÉ QUE TÁ CERTO!
                    </Button>
                </form>
            </Widget.Content>
        </Widget>
    );
}

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

function ResultWidget(){
    return (
        <Widget>
            <Widget.Header>
                Você venceu todas as perguntas. Parabéns!
            </Widget.Header>
        </Widget>
    );
}

export default function QuizPage() {
    const [screenState, setScreenState] = React.useState(screenStates.LOADING);
    const totalQuestions = db.questions.length;
    const [questionIndex, setQuestionIndex] = React.useState(0);
    const question = db.questions[questionIndex];


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
            />
          )}
          {screenState === screenStates.LOADING && <LoadingWidget/>} 
          {screenState === screenStates.RESULT && <ResultWidget/> }
          <Footer> </Footer>

        </QuizContainer>
  
        <GitHubCorner projectUrl="https://github.com/luizarmdep"/>
      </QuizBackground>
    )
  }
