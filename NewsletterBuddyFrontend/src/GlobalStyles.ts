import { createGlobalStyle } from 'styled-components';



const GlobalStyles = createGlobalStyle`
    :root{
        --main-color: #181824;
        --secondary-color: #25273C;
        --border-text-color: #777A92;
        --title: 1.8rem;
        --text: 1.4rem;
        --border-color: hsl(234, 11%, 52%);
        --button-color: hsl(192, 100%, 67%);
        --check: hsl(280, 87%, 65%);
        --bar-size: 4.5rem;
        --text-color: #777A92;
    }
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Ubuntu', sans-serif;
        color: white;
    }

    html {
        font-size: 62.5%;
    }
    body {
        background-color: var(--main-color);
        margin: auto;
         }
    main {
        height: 100vh;
        padding: 2rem;
      }
      #root{
        width: 40rem;
      }
    
      @media (min-width: 600px){
        :root {
          --bar-size: 6.5rem;
        }
        #root{
          width: 50rem;
        }
      }

`;

export { GlobalStyles };
