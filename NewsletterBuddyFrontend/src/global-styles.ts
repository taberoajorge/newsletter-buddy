import {
  createGlobalStyle
} from 'styled-components';



const GlobalStyles = createGlobalStyle`
:root {
  --main-color: white;
  --secondary-color: #25273c;
  --border-text-color: #777a92;
  --title: 1.8rem;
  --text: 1.4rem;
  --border-color: hsl(234, 11%, 52%);
  --button-color: hsl(192, 100%, 67%);
  --check: hsl(280, 87%, 65%);
  --bar-size: 4.5rem;
  --text-color: #777a92;
  --disabled: #b5b5b5;
  --disabled-border: #00d1b2;
  --blue: #0055d4;
  --hover: #003688;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Ubuntu", sans-serif;
}

html {
  font-size: 62.5%;
}
body {
  background-color: var(--main-color);
}

.logo-vertical {
  height: 32px;
    margin: 16px;
    background: rgba(255,255,255,.2);
    border-radius: 6px;
    
    p {
      color: #fff;
      text-align: center;
      line-height: 32px;
      font-size: 1.6rem;
      font-weight: 700;
      margin: 0;
    }
}


`;

export {
  GlobalStyles
};