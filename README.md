# GestionaleClienti

Descrizione: Gestionale clienti, con attenzione alle manutenzioni effettuate

### Funzionalità

- login google con blacklist indirizzo email (https://www.npmjs.com/package/@react-oauth/google)
- aggiunta cliente
- elimina cliente
- 2 anni dopo ultima verifica segna rosso

### Pagine

- homepage
- lista clienti: sortato per manutenzione, se è presente una nota nell'ultima manutenzione c'è un segnale
- pagina lista manutenzioni cliente

### DB

cliente (nome, cognome,telefono, email indirizzo, modello caldaia,cod catasto, data installazione, ultima verifica, installatore)
admin (email)
manutenzione(cliente, data, note)

## TODO
- [X] Lista funzionalità
- [X] Lista pagine
- [X] DB
- [ ] DB draw

