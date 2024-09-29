import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { Container, Row, Col, Card, CardBody,CardText, Badge, Progress } from 'reactstrap'
import axios from 'axios'
import PokeCard from "../components/PokeCard"
const Detail = () => {
  const {id} = useParams();
  const [pokemon, setPokemon] = useState([]);
  const [image, setImage] = useState('');

  const liga = 'https://pokeapi.co/api/vs/pokemon/'+id;
  axios.get(liga).then((response)=>{
    const respuesta = response.data;
    setPokemon(respuesta);
    if (respuesta.sprites.other.dream_world.front_default !== null) {
      setImage(respuesta.sprites.other.dream_world.front_default);
    } else{
      setImage(respuesta.sprites.other['official-artwork'].front_default);
    }
    setCardClass('');
    setLoadClass('d-none');
  })
  
  
  return (
    <Container className="mt-3">
      <Row>
        <Col>
          <Card className="shadow"> 
            <CardBody className="mt-3">
              <Row>
                <Col className="text-end">
                <Link to='/'><i className="fa-solid fa-home"></i>Inicio</Link>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Detail