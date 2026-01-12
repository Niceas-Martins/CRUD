
const OpenModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
   clearFields()
   document.getElementById('modal').classList.remove('active')
 
}


//CREATE

const getlocalStorage = () => JSON.parse(localStorage.getItem('db_cliente')) ?? []
const setlocalStorage = (db_cliente) => localStorage.setItem('db_cliente', JSON.stringify(db_cliente)) 

const createClient = (client) => {
    const db_cliente = getlocalStorage()
    db_cliente.push (client)
    setlocalStorage(db_cliente)
}

//READ

const readClient = () => getlocalStorage()


//UPDATE
 const updateClient = (index, client) =>{
   const db_cliente = readClient()
   db_cliente[index] = client
   setlocalStorage(db_cliente)
 } 


//DELETE
const deleteClient = (index) => {
    const db_cliente = readClient()
    db_cliente.splice(index, 1)
    setlocalStorage(db_cliente)
}

const isValidFields = () => {
  return document.getElementById('form').reportValidity()
}

const clearFields = () => {
  const fields = document.querySelectorAll('.modal-field')
  fields.forEach(fields => fields.value = '')
}


//Interação com o Layout 

const saveClient = () => {
  if(isValidFields()){
    const client = {
      nome: document.getElementById('nome').value, 
      email: document.getElementById('email').value,
      celular: document.getElementById('celular').value,
      cidade: document.getElementById('cidade').value
    }
    const index = document.getElementById('nome').dataset.index
    if(index == 'new'){
     createClient(client)
     updateTable()
     closeModal()
    } else{
      updateClient(index, client)
      updateTable()
      closeModal()
    }
  } 
}
const cancelClient = () => {
    closeModal()
}
const createRow = (client, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = ` 
    <td>${client.nome}</td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
      <button type="button" class="button green" id="edit-${index}">editar</button>
     <button type="button" class="button red" id="delete-${index}">excluir</button>
    </td>
    `
    document.querySelector('#tableClient>tbody').appendChild(newRow)
}

const clearTable = () => {
  const row = document.querySelectorAll('#tableClient>tbody tr')
  row.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
 clearTable()
 const db_cliente = readClient()
 db_cliente.forEach(createRow)
}

updateTable()

const  fillFields = (client) => {
   document.getElementById('nome').value = client.nome
   document.getElementById('email').value = client.email
   document.getElementById('celular').value = client.celular
   document.getElementById('cidade').value = client.cidade
   document.getElementById('nome').dataset.index = client.index
}

const editClient = (index) => {
   const client = readClient()[index]
   client.index = index
   fillFields(client)
   OpenModal()
}

const editDelete = (event) => {
  if(event.target.type == 'button'){
     const [action, index] = event.target.id.split('-')
       
    if(action == 'edit'){
      editClient(index)
    } else{
     const client= readClient()[index] 
     const response = confirm (`Deseja realmente excluir o cliente ${client.nome}`)
     if(response ){
     deleteClient(index)
     updateTable()
     }
    }
  }
}

//Eventos
document.getElementById('cadastrarCliente').addEventListener('click', OpenModal)

document.getElementById('modalClose').addEventListener('click', closeModal)

document.getElementById('salvar').addEventListener('click', saveClient)

document.getElementById('cancelar').addEventListener('click', cancelClient)

document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)