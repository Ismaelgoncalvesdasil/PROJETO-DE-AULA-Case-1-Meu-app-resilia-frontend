const Api = () => {
  const url = 'https://projeto-de-aula-case-1-meu-app-resilia.onrender.com'

  return {
      getFilmes () {
          return fetch(`${url}/filmes`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      deleteFilmes (Id) {
        return fetch(`${url}/filmes/${Id}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      createFilmes (titulo, descricao, porcentagem) {
        return fetch(`${url}/filmes`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              descricao: descricao,
              porcentagem: porcentagem
            }
          )
       })
      },
      updateFilmes(Id, titulo, descricao, porcentagem) {
        return fetch(`${url}/filmes/${Id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              titulo: titulo,
              descricao: descricao,
              porcentagem: porcentagem
            }
          )
       })
      },
  }
}

export default Api