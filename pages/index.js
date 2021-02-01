import React, { useState } from 'react';

//import styled from 'styled-components';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import db from '../db.json';
import Widget from '../src/components/Widget';
import Link from '../src/components/Link';
import Button from '../src/components/Button';
import Input from '../src/components/Input';
import QuizBackground from '../src/components/QuizBackground';
import Footer from '../src/components/Footer';
import GitHubCorner from '../src/components/GitHubCorner';
import QuizLogo from '../src/components/QuizLogo';
import QuizContainer from '../src/components/QuizContainer';


// const BackgroundImage = styled.div` // JavaScript
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

// export const QuizContainer = styled.div` // JavaScript
//   width: 100%;
//   max-width: 350px;
//   padding-top: 45px;
//   margin: auto 10%;
//   @media screen and (max-width: 500px) {
//     margin: auto;
//     padding: 15px;
//   }
// `;

export default function Home() {
  const router = useRouter(); // hooks devem ficar fora do return
  const [name, setName] = React.useState(''); //useState sempre utiliza uma tupla [var, setVar]
  // a segunda posição da tupla traz, automaticamente, função do React que altera/define o state

  return (
    <QuizBackground backgroundImage={db.bg}> 
      <Head>
        <title> Excel Quiz </title>
      </Head>
      <QuizContainer>
        <QuizLogo/>
        <Widget
          as={motion.section}
          transition={{ delay: 0, duration: 0.5}}
          variants={{
            show: { opacity: 1},
            hidden: {opacity: 0},
          }}
          initial='hidden'
          animate='show'
        >
           <Widget.Header> 
              <h1> Excel também é maneiro! </h1>
            </Widget.Header>
            <Widget.Content> 
              <p> Teste os seus conhecimentos sobre a melhor ferramenta Microsoft! </p>
              <form onSubmit={ function (event) {
                event.preventDefault();
                router.push(`/quiz?name=${name}`);
              }} 
              >
                <Input
                  name = 'nomeDoUsuario' 
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  placeholder="Me diga seu nome, desafiante!" 
                  value = {name}
                />
                <Button type="submit" disabled={name.length === 0}> 
                  JOGAR 
                </Button>
              </form>
            </Widget.Content>
        </Widget>
        <Widget
          as={motion.section}
          transition={{ delay: 0.25, duration: 0.5}}
          variants={{
            show: { opacity: 1},
            hidden: {opacity: 0},
          }}
          initial='hidden'
          animate='show'
        >
        <Widget.Content>
            <h1>Quizzes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, '')
                  .replace('https:', '')
                  .replace('.vercel.app', '')
                  .split('.');

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5}}
          variants={{
            show: { opacity: 1},
            hidden: {opacity: 0},
          }}
          initial='hidden'
          animate='show'
        >

        </Footer>
      </QuizContainer>

      <GitHubCorner projectUrl="https://github.com/luizarmdep"/>
    </QuizBackground>
  ) //<Title>My page</Title>
}


// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

// function Title (props) { // function define um componente
//   return ( // dentro do return, fica estabelecido o código html do componente
//     <h1> 
//       {props.children} 
//     </h1>
//   )
// }
// ---  function Title executa a mesma coisa que a const Title; 
// --- vantagem da const é poder definir o estilo junto