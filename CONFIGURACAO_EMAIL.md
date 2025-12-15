# Configuração de E-mail de Confirmação

## Problema
O e-mail de confirmação não está sendo recebido após o cadastro.

## Soluções

### Opção 1: Desabilitar Confirmação de E-mail (Recomendado para Desenvolvimento)

1. Acesse o dashboard do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto "gallery"
3. Vá para **Authentication** → **Providers** → **Email**
4. Desmarque a opção **"Confirm email"**
5. Clique em **Save**

Agora os usuários poderão fazer login imediatamente após o cadastro, sem precisar confirmar o e-mail.

### Opção 2: Autoconfirmar Usuários Existentes

Se você já se cadastrou mas não recebeu o e-mail, execute o script SQL:

1. No v0, clique para executar o arquivo `scripts/002_autoconfirm_users.sql`
2. Isso confirmará automaticamente todos os usuários pendentes

### Opção 3: Configurar SMTP para Envio de E-mails (Produção)

Para produção, você pode configurar um provedor SMTP:

1. Vá para **Project Settings** → **Auth** → **SMTP Settings**
2. Configure seu provedor de e-mail (Gmail, SendGrid, Mailgun, etc.)
3. Teste o envio de e-mails

## Verificar Status de Confirmação

Para ver quais usuários estão pendentes de confirmação, você pode executar:

\`\`\`sql
SELECT 
  email, 
  created_at, 
  email_confirmed_at,
  CASE 
    WHEN email_confirmed_at IS NULL THEN 'Pendente'
    ELSE 'Confirmado'
  END as status
FROM auth.users
ORDER BY created_at DESC;
\`\`\`

## Recomendação

Para desenvolvimento local, **desabilite a confirmação de e-mail** seguindo a Opção 1.
Para produção, configure um provedor SMTP adequado seguindo a Opção 3.
