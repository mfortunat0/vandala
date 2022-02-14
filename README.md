# Vandala Bank

Este e um projeto para simular uma conta bancaria digital, como criar uma conta, depositar, sacar etc...

## Stack

**Back-end:** Node, Express, Morgan,Typeorm, Swagger,PM2, Docker

## Requisitos

- Docker
- Docker-compose

## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu **.env** semelhante ao **.env.sample**

`PORT`
`SALT`
`SECRET`
`TYPEORM_TYPE`
`TYPEORM_HOST`
`TYPEORM_PORT`
`TYPEORM_USERNAME`
`TYPEORM_PASSWORD`
`TYPEORM_DATABASE`

## Deploy

Clone o projeto

```bash
  git clone https://github.com/mfortunat0/vandala
```

Entre no diretório do projeto

```bash
  cd vandala
```

Suba os containers

```bash
  docker-compose up -d
```

## Desenvolver

Com projeto clonado e configurado, basta subir os container com arquivo compose **docker-compose.dev.yml**

```bash
docker-compose -f docker-compose.dev.yml up
```

## Documentação

A documentação foi feita utilizando o swagger com padrão open api 3.0.0. Para acessar basta inicializar a aplicação e acessar a rota **/docs**.

## Funcionalidades

- Criar conta
- Autenticação/Autorização
- Deposito
- Saque
- Transferencia
