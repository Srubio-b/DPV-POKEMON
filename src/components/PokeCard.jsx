import { useState, useEffect } from 'react';
import axios from 'axios'
import { Col, Card, CardBody, CardFooter, CardImg, Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

const PokeCard = (params) => {
  const [pokemon, setPokemon] = useState([]);
  const [image, setImage] = useState('');
  const [cardClass, setCardClass] = useState('d-none');
  const [loadClass, setLoadClass] = useState('');

  useEffect(()=>{
    getPokemon();
  },[])

  const getPokemon = async () => {
    const liga = params.poke.url;
    axios.get(liga).then(async(response)=>{
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
  }

  return (
    <Col sm='4' lg='3' className='mb-3'>
      <Card className={'shadow '+loadClass}>
        <CardImg src='/public/img/loading-poke2.gif' height='200' className='p-3'></CardImg>
      </Card>
      <Card className={'shadow '+cardClass}>
        <CardImg src={image} height='150' className='p-2' />
        <CardBody className='text-center'>
          <Badge pill color='danger'># {pokemon.id}</Badge>
          <label className='pl-2 text-capitalize'>&nbsp;{pokemon.name}</label>
        </CardBody>
        <CardFooter className='bg-white'>
          <Link to={`/pokemon/${pokemon.id}`} className='btn btn-dark shadow'>
          <i className='fa-solid fa-arrow-up-right-from-square'></i> 
          &nbsp;Detalle
          </Link>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default PokeCard