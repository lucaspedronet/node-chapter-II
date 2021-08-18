# 3 Tipos de Requisitos da aplicação
    1 - Requisitos Funcionais (RF)
    2 - Requisitos Não Funcionais (RNF)
    3 - Regra de Negócio (RN)
---
## Cadastro de Carros

**RF**
- DEVE ser possível cadastrar um novo carro

**RN**
- NÃO DEVE ser possível cadastrar um carro com uma placa já existente.
- NÃO DEVE ser possível alterar a placa de um carro já cadastrado.
- O carro DEVE ser cadastro, por padrão, com DISPONIBILIDADE.
- O usuário responsável pelo cadastro DEVE ser um usuário ADMINISTRADOR.
---
## Listagem de Carros

**RF**
- DEVE ser possível listar todos os carros DISPONÍVEIS.
- DEVE ser possível listar todos os carros DISPONÍVEIS pelo nome da CATEGORIA.
- DEVE ser possível listar todos os carros DISPONÍVEIS pelo nome da MARCA.
- DEVE ser possível listar todos os carros DISPONÍVEIS pelo nome do CARRO.

**RN**
- O usuário NÃO PRECISA estar cadastrado no sistema.
---
## Cadastro de Especificação do Carro

**RF**
- DEVE ser possível cadastrar uma especificação para um carro.
- DEVE ser possível listar TODAS as especificações.
- DEVE ser possível listar TODOS os carros.

**RN**
- NÃO DEVE ser possível cadastrar uma especificação de um carro não cadastrado.
- NÃO DEVE ser possível cadastrar uma mesma especificação para um mesmo carro.
- O usuário responsável pelo cadastro DEVE ser um usuário ADMINISTRADOR.
---
## Cadastro de Imagens do Carro

**RF**
- DEVE ser possível cadastrar a imagem do carro.
- DEVE ser possível cadastrar mais de uma imagem para o mesmo carro.
- DEVE ser possível listar TODOS os carros.

**RNF**
- UTILIZAR o MULTER para upload dos arquivos.

**RN**
- NÃO DEVE ser possível cadastrar uma mesma imagem para um mesmo carro.
- NÃO DEVE ser possível cadastrar uma mesma imagem para um carro diferente.
- O usuário responsável pelo cadastro DEVE ser um usuário ADMINISTRADOR.
---
## Aluguel de Carro

**RF**
- DEVE ser possível cadastrar um aluguel.

**RN**
- O aluguél DEVE ter duração MÍNIMA de 24 HORAS.
- NÃO DEVE ser possível cadastrar um novo aluguél caso já exista um aberto para o mesmo usuário.
- NÃO DEVE ser possível cadastrar um novo aluguél caso já exista um aberto para o mesmo carro.
---
## Devolução de carro

**RF**
- DEVE ser possível realizar a devolução de um carro

**RN**
- CASO o carro for devolvido com menos de 24h será cobrada a diária completa.
- Ao realizar a devolução o carro DEVERÁ ser liberado para outro alugél.
- Ao realizar a devolução o usuário DEVERÁ ser liberado para outro alugél.
- Ao realizar a devolução DEVERÁ ser calculado o total do aluguél.
- CASO o horário de devolução seja superior ao previsto para entrega, deverá ser cobrada uma multa proporcional aos dias de atraso.
- CASO haja multa, deverá ser somada ao total do alugél.

## Recuperação de senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o email
- O usuário deve receber um email com o passo a passo da recuperação de senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar um nova senha
- O link enviado para a recuperação deve expirar em 3 horas
