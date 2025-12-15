-- Script para autoconfirmar usuários existentes que ainda não foram confirmados
-- Execute este script se você já se registrou mas não recebeu o e-mail de confirmação

UPDATE auth.users
SET email_confirmed_at = NOW(),
    confirmed_at = NOW()
WHERE email_confirmed_at IS NULL;
