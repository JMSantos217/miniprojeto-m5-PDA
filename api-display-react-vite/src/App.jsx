import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaUsers, FaStar, FaComment } from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #121212;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #f0f0f0;
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  color: #fff;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Card = styled.div`
  background-color: #fff;
  color: #333;
  border-radius: 12px;
  padding: 20px;
  width: 250px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 2rem;
    font-weight: bold;
  }

  .icon {
    font-size: 3rem;
    color: #e63946;
    margin-bottom: 10px;
  }
`;

const Navbar = styled.nav`
  background-color: #b22222; 
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .menu-btn {
    display: none;
    flex-direction: column;
    cursor: pointer;
  }

  .menu-btn span {
    height: 4px;
    width: 30px;
    background-color: #fff;
    margin: 4px 0;
  }

  .nav-links {
    display: flex;
    gap: 1.5rem;
  }

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 0.3s ease;

    &:hover {
      color: #ff4d4d; 
    }
  }

  @media (max-width: 768px) {
    .menu-btn {
      display: flex;
    }

    .nav-links {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 60px;
      left: 0;
      width: 100%;
      background-color: #b22222; 
      text-align: center;
      padding: 1rem 0;
    }

    .nav-links.show {
      display: flex;
    }
  }
`;


function App() {
  const [satisfactions, setSatisfactions] = useState([]);
  const [error, setError] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/satisfactions')
      .then(response => {
        setSatisfactions(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  const quantidadeAvaliacoes = satisfactions.length;
  const mediaSatisfacao = satisfactions.reduce((acc, item) => acc + item.overallSatisfaction, 0) / quantidadeAvaliacoes || 0;
  const usuariosUnicos = new Set(satisfactions.map(item => item.userId)).size;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Navbar>
        <h2>ClientView</h2>
        <div className="menu-btn" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`nav-links ${menuOpen ? 'show' : ''}`}>
          <a href="#home">Home</a>
          <a href="#about">Sobre</a>
          <a href="#contact">Contato</a>
        </div>
      </Navbar>
      <Container>
        <Title>Painel de Avaliação de Clientes</Title>
        {error && <p>Erro ao carregar os dados: {error}</p>}
        <CardContainer>
          <Card>
            <FaComment className="icon" />
            <h3>Quantidade de Avaliações</h3>
            <p>{quantidadeAvaliacoes}</p>
          </Card>
          <Card>
            <FaStar className="icon" />
            <h3>Média de Satisfação</h3>
            <p>{mediaSatisfacao.toFixed(2)}</p>
          </Card>
          <Card>
            <FaUsers className="icon" />
            <h3>Usuários Únicos</h3>
            <p>{usuariosUnicos}</p>
          </Card>
        </CardContainer>
      </Container>
    </>
  );
}

export default App;
