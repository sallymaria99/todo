# TODO-applikation som testas E2E med Cypress

Detta är en Todo-applikation i sin enklaste form, där fokuset mer

## Installation

1.  `npm install` <br></br>
2.  Skapa `.env` & `.env.test` filer, där du länkar din databas: `DATABASE_URL="file:./**.db"` <br></br>
3.  Starta db och seeda innehållet:
    `npm run push` <br></br>
    `npm run seed`<br></br>
4.  Starta utvecklingsservern: <br>
    `npm run dev` & <br></br>
    `npm run cy:dev` för jag kör Cypress port på http://localhost:3100 <br></br>
5.  Starta Cypress & testningen:
    `npm run cypress:open`
