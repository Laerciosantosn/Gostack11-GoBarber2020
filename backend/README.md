# Recuperação de senha

<!-- Requisitos Funcional -->
**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

<!-- Requisitos não Funcionais -->
**RNF**
- Utilizar Maitrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);


<!-- Regra de Negocio -->
**RN**
- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

<!-- Requisitos Funcional -->
**RF**

- O usuário deve poder atulizar o seu nome, email e senha;

<!-- Requisitos não Funcionais -->
**RNF**

- O usuário não pode alterr seu e-mail pra um email já utilizado;
- Para atualizar sua senha, o usuário  deve informar a senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

<!-- Requisitos Funcional -->
**RF**

- O usuário deve poder listar seu agendamentos de um dia especifico;
- O prestador deve recever um notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

<!-- Requisitos não Funcionais -->
**RNF**

- Os agendamentos do prestador no dia devem ser armazenado em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

<!-- Regra de Negocio -->
**RN**

- A notificação deve ter um status de lida ou não-lida par que prestador possa controlar;

# Agendamento de serviços

<!-- Requisitos Funcional -->
**RF**

- O usuário deve poder listar todos prestadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horario disponível de um prestado;
- O usuário deve poder listar horários disponíveis  =em  um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

<!-- Requisitos não Funcionais -->
**RNF**

- A listagem de prestadores deve ser armazenada em cache;

<!-- Regra de Negocio -->
**RN**
- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devemestar disponiveis entre 8h e 18h (Primeiro às 8h, ultimo as 17h)
- O suaário não pode agendar em um horário já ocupado;
- O suaário não pode agendar em um horário que já passou;
- O suaário não pode agendar serviços com ele mesmo;


