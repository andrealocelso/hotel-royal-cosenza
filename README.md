# Hotel Royal Cosenza – sito web

Sito statico (HTML/CSS/JS, nessun build) per l'Hotel Royal, hotel 4 stelle nel centro di Cosenza.
Pubblicato con GitHub Pages.

## Struttura

| File | Contenuto |
| --- | --- |
| `index.html` | Home: prenotazione (le date sono il titolo), hotel, camere, ristorante, sala convegni, tour 3D |
| `camere.html` | Le sei tipologie di camere e suite |
| `gallery.html` | Galleria fotografica con filtri e lightbox |
| `dove-info.html` | Dove siamo: contatti, richiesta di preventivo, mappa |
| `css/style.css` | Stile |
| `js/main.js` | Menu mobile, date di prenotazione, foto delle camere, filtri e lightbox della gallery, modulo (nessuna libreria esterna) |
| `img/` | Foto e logo |

Header e footer sono ripetuti in ognuna delle quattro pagine HTML: se cambi un contatto o un link, aggiornalo in tutte.

Colori: marmo `#F6F5F2`, grafite `#3E3E41`, rosso hall `#A8232B`, albicocca `#EFA24A`, ardesia `#1E2226`. Caratteri: Marcellus (titoli) e Public Sans (testi).

## Anteprima in locale

```bash
python -m http.server 8080
```

poi apri http://localhost:8080

## Collegare un dominio personalizzato

1. Su GitHub: **Settings → Pages → Custom domain**, inserisci il dominio (es. `www.tuodominio.it`) e salva.
   GitHub crea automaticamente il file `CNAME` nel repository.
2. Dal pannello DNS del tuo provider:
   - per `www.tuodominio.it`: record **CNAME** `www` → `<utente-github>.github.io`
   - per il dominio nudo `tuodominio.it`: record **A** verso
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
     (e facoltativamente **AAAA** verso `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`)
3. Quando il DNS si è propagato, attiva **Enforce HTTPS** nella stessa pagina.
