# API de Gestão de Lojas

Esta API foi desenvolvida para facilitar a gestão de informações relacionadas a vendedores, clientes e vendas, além de permitir a análise de dados através de relatórios detalhados. Utilizando tecnologias modernas como Node.js, Express e MongoDB, esta aplicação oferece uma interface robusta e escalável para operações CRUD, proporcionando um ambiente eficiente para o gerenciamento de dados em lojas.

## Estrutura do Projeto

- **config/**: Contém o arquivo `db.js` responsável pela configuração da conexão com o banco de dados MongoDB.
- **middlewares/**: Inclui `validatorRequest`, que centraliza a validação das requisições recebidas, garantindo que os dados estejam corretos antes de serem processados.
- **models/**: Define os esquemas dos dados com os modelos para `client`, `sale` e `seller`, que representam as entidades principais da aplicação.
- **routes/**: Estabelece as rotas para gerenciar as operações associadas a `client`, `sale` e `seller`, permitindo o acesso e manipulação dos dados.
- **utils/**: Contém funções utilitárias, como `validateCPF`, que auxilia na validação de documentos brasileiros, como CPF, integrando funcionalidades de validação diretamente na lógica da aplicação.
- **docs/**: Disponibiliza a documentação da API utilizando Swagger, facilitando a visualização das rotas e métodos disponíveis, bem como seus parâmetros e respostas.

## Requisitos Mínimos

Para executar este projeto localmente, você precisará dos seguintes requisitos:

- Node.js (versão 14 ou superior)
- MongoDB (local ou em serviço como MongoDB Atlas)
- NPM (gerenciador de pacotes do Node)

## Configuração do Ambiente

1. Clone este repositório para sua máquina local:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ```

2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto e adicione a variável de ambiente `DB_STRING` com a string de conexão do MongoDB:
   ```plaintext
   DB_STRING=mongodb://<usuario>:<senha>@localhost:27017/seu-banco
   ```

   **Observação**: Substitua `<usuario>`, `<senha>` e `seu-banco` pelas suas credenciais e nome do banco de dados.

4. Para iniciar a aplicação, use o comando:
   ```bash
   npm start
   ```

## Uso

Após iniciar a aplicação, a API estará disponível em `http://localhost:3000`. Você pode testar as rotas usando uma ferramenta como Postman ou cURL.


## Licença

Este projeto está licenciado sob a MIT License.