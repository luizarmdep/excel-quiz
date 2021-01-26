import styled from 'styled-components'
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizBackground from '../src/components/QuizBackground'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'


// const BackgroundImage = styled.div` // JavaScript
//   background-image: url(${db.bg});
//   flex: 1;
//   background-size: cover;
//   background-position: center;
// `;

export const QuizContainer = styled.div` // JavaScript
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

export default function Home() {
  return (
    <QuizBackground backgroundImage={db.bg}> 
      <QuizContainer>
        <Widget>
           <Widget.Header> 
              <h1> The Legend of Zelda </h1>
            </Widget.Header>
            <Widget.Content> 
              <p> lorem ipsum dolo... </p>
            </Widget.Content>
        </Widget>
        <Widget>
        <h1> Quizes da Galera </h1>

        <p> lorem ipsum dolo... </p>
        </Widget>
        <Footer>

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