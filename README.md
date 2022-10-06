Céciles svendeprøve dokumentation


Tech-Stack:

Jeg har valgt at bruge React for at imødekomme kravet om en komponent baseret tilgang. Desuden er React meget populært og mange arbejdsgivere efterspørger evnen, så jeg er interesseret i at lære det godt for øge chancen for at blive ansat efter studiet. 


Grundlæggende teknologier:
HTML
CSS
JavaScript


Core Frameworks:
Sass/SCSS – stylesheet sprog, en forøget made at bruge CSS. 
Tech-Stack perspektivering: 
Jeg foretrækker at kode alle klasser selv, for bedre at kunne have et overblik og styre alle egenskaber, derfor foretrækker jeg Sass overfor andre pakker såsom Tailwind, der allerede har predefinerede klasser.


Core libraries:
React.js — komponent baseret bibliotek, der bruger JavaScript og JSX til at tillade at man blander HTML og Javascript på en effektiv måde, der også er hurtig til at loade pga. en virtuel DOM, hvilket er én af grundene til React er blevet så populær. 

Tech-Stack perspektivering:


Code API’s:
Context – Global stage håndtering
Tech-Stack perspektivering: Context er en smart måde at have variabler tilgengelig ove rhele hjemmesiden, et meget bedre alternativ en fx prop-drilling, hvor man skal have dataen gennem mange props og komponenter, før de kommer det rigtige sted hen. Det er selvfølgelig over-kill at bruge context til data der kun bruges ét sted, så det er med at finde de eksempler, hvor daten skal bruges flere steder - kompleks state, kalder man det også. Jeg har brug context til login informationer.


Core packets:
React-router-dom 
React-icons 
Axios 

Tech-Stack perspektivering:
-	Med Axios for man data konverteringen forærende modsat med Fetch.
-	Jeg har brugt React-router-dom for at lave en One Page Applikation, der loader hurtigt og gør brugeroplevelsen god.
-	React-Icons gør det muligt at nemt at importere og bruge et bredt udvalg af ikoner til ens komponenter, og gøre det muligt nemt at redigere størrelse og farve af ikonet også.

Versionsstyring:
Github – Jeg bruger Github til at pushe & commit mit arbejde, for at have et overblik og have adgang til koden online. Jeg har gjort en ære ud af at commite hver gang jeg var færdig med delopgaver, fx header, og skrive meningsfulde commit-beskeder. 
Tech-Stack perspektivering:

Proces dokumentation:
Trello – et kanban board. Link: https://trello.com/invite/b/2qRKmim7/82309d59aa7c7d72032165b790467c64/svendeproevetrello
Tech-Stack perspektivering:
Jeg foretrækker Trello’s processtyrings værktøj, eftersom UI og design for mig er mere overskueligt og, ærlig talt, sjovt og farverigt også, end GitHubs eget Kanban processtyrings alternativ (der er mindre farverigt og mere tørt og svært at navigere i efter min mening). 

Deploy process:
Netlify – kan kobles til Github og dermed nemt sætte hjemmesiden online derigennem. For at kunne deploy’e bliver man nødt til at lave en fork af projektet til min personlige github konto, da det ikke er muligt direkte fra eksamens repository’et. 
[![Netlify Status](https://api.netlify.com/api/v1/badges/3304d1ae-ee79-4bf8-9733-cb5c7d9a3226/deploy-status)](https://app.netlify.com/sites/landrup-dans-netlify/deploys)


Projekt perspektivering:
1.	Skalering fremover: yderligere funktionalitet man kunne overveje at lade danselæreren afmelde elever; hvis de er strenge eller af andre omstændigheder ikke selv kan finde ud af at afmelde sig et hold eksempelvis.  

2.	Forbedrings muligheder: for at undgå og minimere bugs, og gøre debugging nemmere, kunne det være smart at bruge typescript, hvor man sætter data-typer på koden. 




Kode til særlig bedømmelse: 

Jeg vil i min præsentation kommer nærmere ind på min brug af Axios og React Context. 

Kode fra axios.js fil:
```
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000/",
});
```
Kode fra Context i AuthProvider.js
```
import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
  );
};
```
Axios fetch eksempel fra activities.js
```
import axios from "../apis/axios";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

const ACTIVITIES_URL = "api/v1/activities";

const Activities = () => {
  const useA = useAuth();
  const auth = useA.auth;

  const login = auth.login;

  const [activitiesData, setActivitiesData] = useState("");

  useEffect(() => {
    fetchActivities();
    // eslint-disable-next-line
  }, [activitiesData?.length]);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(ACTIVITIES_URL);

      let activities = response?.data;

      setActivitiesData(activities);

    } catch (err) {
      console.log(err);
    }
  };
```
