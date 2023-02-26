import { Table, Container, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import CreateModal from './components/CreateFilmesModal'
import UpdateModal from './components/UpdateModal'
import Api from './api/Api'

function App() {
  const [filmes, setFilmes] = useState()
  const [CreateModalOpen, setCreateModalOpen] = useState(false)
  const [UpdateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedFilmes, setSelectedFilmes] = useState()

  const handleCloseCreateModal = () => setCreateModalOpen(false);
  const handleShowCreateModal = () => setCreateModalOpen(true);

  const handleCloseUpdateModal = () => setUpdateModalOpen(false);
  const handleShowUpdateModal = () => setUpdateModalOpen(true);

  useEffect(() => {
    async function getData() {
      await Api().getFilmes().then(data => {
        return data.json()
      })
      .then(data => {
        setFilmes(data)
      })
    }

    getData()
  }, [])

  async function deleteFilmes(Id) {
    try {
      await Api().deleteFilmes(Id)

      const formattedFilmes = filmes.filter(filme => {
        if(filme.id !== Id){
          return filme
        }
      })

      setFilmes(formattedFilmes)
    } catch(err) {
      throw err
    }
  }

  async function createFilmes(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await Api().createFilmes(
        req.titulo.value, req.descricao.value, Number(req.porcentagem.value)
      ).then(data => {
        return data.json()
      }).then(res => {
        setFilmes([...filmes, {
          id: res.Id,
          titulo: req.titulo.value,
          descricao: req.descricao.value,
          porcentagem: Number(req.porcentagem.value)
        }])

        setCreateModalOpen(false)
      })
    } catch(err) {
      throw err
    }
  }

  async function updateFilmes(event) {
    try {
      event.preventDefault()

      const req = event.currentTarget.elements

      await Api().updateFilmes(
        selectedFilmes.id, req.titulo.value, req.descricao.value, Number(req.porcentagem.value)
      )

      const formattedFilmes = filmes.map(film => {
        if(film.id === selectedFilmes.id) {
          return {
            id: selectedFilmes.id,
            titulo:  req.titulo.value,
            descricao: req.descricao.value,
            porcentagem: Number(req.porcentagem.value)
          }
        }

        return film
      })

      setFilmes(formattedFilmes)

      setUpdateModalOpen(false)
    } catch(err) {
      throw err
    }
  }

  return(
    <> 
    <Container
      className="
        d-flex
        flex-column
        align-items-start
        justify-content-center
        h-100
        w-100
        "
    >
      <Button
        className="mb-8"
        onClick={handleShowCreateModal}
        variant='primary'>
        Adicionar Filmes
      </Button>
     
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Descrição</th>
            <th>Porcentagem</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {filmes && filmes.map(filmes=> (
            <tr key={filmes.id}>
              <td>{filmes.titulo}</td>
              <td>{filmes.descricao}</td>
              <td>{filmes.porcentagem}</td>
              <td>
                <Button onClick={() => deleteFilmes(filmes.id)} variant='danger'>
                  Excluir
                </Button>
                <Button
                  onClick={() => {
                    handleShowUpdateModal()
                    setSelectedFilmes(filmes)
                  }}
                  variant='warning'
                  className='m-1'
                  >
                  Atualizar
                </Button>
              </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
    <CreateModal ModalOpen={CreateModalOpen} handleClose={handleCloseCreateModal} createFilmes={createFilmes} />
    {selectedFilmes && (
      <UpdateModal ModalOpen={UpdateModalOpen} handleClose={handleCloseUpdateModal} updateFilmes={updateFilmes} filmes={selectedFilmes} />
    )}
    </>
  )
}

export default App