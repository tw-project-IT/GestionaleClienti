# GestionaleClienti

Gestionale clienti, con attenzione alle manutenzioni effettuate

### Funzionalità

- login google con whitelist indirizzo email (https://www.npmjs.com/package/@react-oauth/google)
- aggiunta cliente
- elimina cliente
- 2 anni dopo ultima verifica segna rosso

### Pagine

- homepage
- lista clienti: sortato per manutenzione, se è presente una nota nell'ultima manutenzione c'è un segnale
- pagina lista manutenzioni cliente

### DB

- cliente (nome, cognome,telefono, email indirizzo, modello caldaia,cod catasto, data installazione, ultima verifica, installatore)
- admin (email)
- manutenzione(cliente, data, note)

## TODO
- [X] Lista funzionalità
- [X] Lista pagine
- [X] DB
- [X] DB draw
- [ ] Implementazione DB
- [ ] Pagina lista clienti
- [ ] Pagina aggiungi cliente
- [ ] Aggiunta manutenzione
- [ ] Login google
- [ ] Check email google

## Next
- [ ] Home page - dashboard

## Maybe
- [ ] Elima cliente
- [ ] Pagina modifica cliente
