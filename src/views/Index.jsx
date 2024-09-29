import { Container, Row, Col, InputGroup, InputGroupText, Input } from 'reactstrap'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PokeCard from '../components/PokeCard'
import { PaginationControl } from 'react-bootstrap-pagination-control'
const Index = () => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(0);
  const[limit, setLimit] = useState(20);
  const[total, setTotal] = useState(0);

  useEffect(() => {
    getPokemons(offset)
    getAllPokemons()
  }, [offset])
  const getPokemons = async (o) => {
    const liga = `https://pokeapi.co/api/v2/pokemon?offset=${o}&limit=${limit}`
    axios.get(liga).then(async(response)=>{
      const respuesta = response.data
      setPokemons(respuesta.results)
      setList(respuesta.results)
      setTotal(respuesta.count)
    })
  }
  const getAllPokemons = async () => {
    const liga = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=100000`
    axios.get(liga).then(async(response)=>{
      const respuesta = response.data
      setAllPokemons(respuesta.results)
    })
  }
  const serch = async(e)=>{
    if(e.keyCode == 13){
      if(filter.trim() != ''){
        setList([]);
        setTimeout(()=>{
          setList(allPokemons.filter(p => p.name.includes(filter)))
        },100)
      }
    } else if(filter.trim() == '') {
      setList([]);
      setTimeout(() => {
        setList(pokemons);
      },100);
    }
  }
const goPage = async(p) => {
  setList([]);
  await getPokemons ((p==1) ? 0 : ((p-1)*20));
  setOffset(p);
}

  return (
    <Container className='shadow'>
      <Row>
        <Col className='m-0 p-0'>
          <InputGroup>
            <InputGroupText><i className='fa-solid fa-search'></i></InputGroupText>
            <Input
            value={filter}
            onChange={(e)=>setFilter(e.target.value)}
            onKeyDownCapture={serch}
              placeholder='Buscar pokemon'
             />
          </InputGroup>
        </Col>
      </Row>
      <Row className='mt-3'>
        {list.map((pok, i)=>(
          <PokeCard poke={pok} key={i} />
        ))}
        <PaginationControl 
        last={true} 
        limit={limit} 
        total={total} 
        page={offset} 
        changePage={page => goPage(page)} 
        />
      </Row>
    </Container>
    )
}

export default Index