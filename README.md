![image](https://github.com/gabrielsb18/Projeto-de-Interface-IESB/blob/master/IESB_banner.jpg)

# PI-BackEnd-IESB

*API construida para a disciplina de Projeto Integrado*

## Integrantes:

* Gabriel Santos Barbosa;
* Rainier Barbosa dos Santos Viana;
* Rodrigo Barros Costa

## Objetivo:

 *O Notes tem como objetivo, oferecer a usuários, a possibilidade de registrar suas anotações, como tarefas, e atividades.*

## Funcionalidades:
*  Listar todas as anotações;
*  Excluir uma anotação;
*  Editar uma anotação;
*  Criar uma anotação;
*  Fazer login e cadastro e usuário na aplicação;
*  Pesquisar entre todas anotações
*  Fazer upload de imagem
*  Buscar dados dos usuários


## Como Rodar o app:

<div>
 
  #### 1) Clone o repositório através do link
  
     git clone 'https://github.com/gabrielsb18/PI-BackEnd-IESB'
    
  #### 2) Navegue até a pasta API-Notes
  
     cd .PI-BackEnd-IESB
    
 #### 3) Faça a instalação do aquivo node_modules (É necessário ter o Node instalado na máquina)

     npm install

 #### 4) Em seguida crie um arquivo .env com as seguintes variaveis:

     MONGODB_URL=
     SEGREDO=
     SEGREDO_REFRESH=
     
     
 #### 4) Digite o seguinte comando para testar a aplicação

     npm run test

 #### 5) Para rodar a aplicação digite o seguinte codigo

     npm run dev

 #### 6) Para acessar a documentação digite a seguinte URL no navegador

     http://localhost:3000/api-docs

 #### 7) Para gerar um novo Token, e poder acessar as rotas protegidas, realize a seguinte requisiçao com o ThunderClient

     {
         "email": "email@gmail.com"
         "senha": "senha123"
     }

 #### 8) OBS:
 
     Após fazer essa requisição você terá como retorno o Token de acesso, para poder acessar as rotas e fazer requisições pelo Swagger
 
      
</div>

## Tecnologias utlizadas:

<div>
 <img src=	"https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black">
 <img src=	"https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
 <img src=	"https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
 <img src=	"https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
 <img src=	"https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white">
 <img src=	"https://img.shields.io/badge/Mongoose-880000.svg?style=for-the-badge&logo=Mongoose&logoColor=white">
 <img src=	"https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
</div>


## Links:
<div>
 <p>Quadro do Kandan:</p>
  <a href="https://github.com/users/gabrielsb18/projects/4"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"></a>
<div>
