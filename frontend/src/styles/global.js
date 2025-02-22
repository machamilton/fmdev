import styled, { css, createGlobalStyle } from 'styled-components';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { initializeIcons } from '@uifabric/icons';
import { loadTheme } from 'office-ui-fabric-react';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'react-circular-progressbar/dist/styles.css';
import { createMuiTheme } from '@material-ui/core';

export const primaryColor = '#4A5173';
const secondaryColor = '#000';
export const terciaryColor = '#DEB981';
export const fontFamily = 'Avenir';

loadTheme({
  palette: {
    themePrimary: terciaryColor,
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff',
  },
});

initializeIcons();

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Avenir');
  @import url('https://fonts.googleapis.com/css?family=Mada');

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #E5E5E5;
    color: #FFF;
    font-family: ${fontFamily}, sans-serif;
    text-rendering: optimizeLegibility !important;
    -webkit-font-smoothing: antialised !important;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
  }

  .p-button {
    background-color: ${primaryColor} !important;
    border-color: ${primaryColor} !important;
  }

  .p-picklist .p-picklist-list .p-picklist-item.p-highlight {
    background-color: ${primaryColor} !important;
    border-color: ${primaryColor} !important;
  }

  .MuiList-padding {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .input {
    padding: 10px;
    border-radius: 3px;
    border: none;
    margin-top: 8px;
    transition: border 0.15s ease;
    font-size: 16px;
    border: 1px solid #BBB;

    &:focus {
      border: 1px solid #000;
    }
  }

  .active-chip {
    padding-left: .4vw !important;
    font-family: ${fontFamily} !important;
    color: #FFF !important;
    background-color: ${primaryColor} !important;
    }

  .inactive-chip {
    padding-left: .4vw !important;
    color: ${primaryColor} !important;
    font-family: ${fontFamily} !important;
    background-color: transparent !important;
    border: .8px solid ${primaryColor} !important;
  }

  .lms-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 10rem;
    width: 30.5%;
    margin: .5vw;
    background-color: #FBFBFB !important;
    font-family: ${fontFamily} !important;
  }
`;

export const ComboBoxStyle = {
  container: {
    marginBottom: '1rem',
    '&:hover': {
      border: '1px solid red',
    },
  },
  root: {
    backgroundColor: '#F5F5F5',
    '&:hover': {
      border: '1px solid red',
    },
  },
  input: {
    backgroundColor: '#F5F5F5',
    '&:hover': {
      border: '1px solid red',
    },
  },
};

export const selectStyle = {
  container: (provided) => ({
    ...provided,
    width: '100%',

    fontSize: 12,
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: secondaryColor,
    padding: 5,
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: secondaryColor,
    borderRadius: '0 8px 8px 0',
    '&:hover': {
      color: '#fff',
      cursor: 'pointer',
      backgroundColor: secondaryColor,
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: secondaryColor,
    padding: 5,
    ':hover': {
      color: secondaryColor,
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: 16,
  }),
  groupHeading: (provided) => ({
    ...provided,
    color: secondaryColor,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: 30,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#F9F9F9',
    boxShadow: state.isFocused || state.isHovered ? `0 0 0 1px ${secondaryColor}` : null,
    '&:hover': {
      borderColor: secondaryColor,
    },
    borderWidth: 1,
    minHeight: 30,
  }),
  option: (provided, state) => {
    let color = '#000';
    let background;

    if (state.isFocused && !state.isSelected) {
      color = secondaryColor;
      background = '#EEE';
    }

    if (state.isSelected) {
      color = '#FFF';
      background = secondaryColor;
    }

    return {
      ...provided,
      color,
      background,
      ':active': {
        color: '#FFF',
        backgroundColor: secondaryColor,
      },
    };
  },
};

export const Table = styled.table`
  color: black;
  width: 100%;
  border-spacing: 0;
  padding-top: 1rem;
  font-size: 13px;

  tbody > tr:nth-child(odd) {
    background-color: #FAFAFA;
  }

  button {
    background: transparent;
    color: black;
    border: 1px solid black;

    &:hover {
      color: #FFF;
    }
  }
`;

export const FirstHeaderColumn = styled.td`
  padding: .7rem;
  padding-left: 2rem;
  font-weight: bold;
`;

export const HeaderColumn = styled.td`
  padding: .7rem;
  font-weight: bold;

  ${(props) => props.align && css`
    text-align: ${props.align};
  `}
`;

export const FirstItemColumn = styled.td`
  padding-left: 2rem;

  ${(props) => props.isClickable && css`
    &:hover {
      cursor: pointer;
    }
  `}
`;

export const ItemColumn = styled.td`
  padding: .7rem;

  ${(props) => props.align && css`
    text-align: ${props.align};
  `}

  ${(props) => props.isClickable && css`
    &:hover {
      cursor: pointer;
    }
  `}
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-right: 2rem;
  }
`;

export const StatusMsgContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15vh;
  padding-bottom: 15vh;
  color: #000;
  opacity: .5;
  font-size: 1.2rem;
`;

export const WaitingContainerBackdrop = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  padding-top: 15vh;
  padding-bottom: 15vh;
  font-size: 1.2rem;
  background: rgba(0,0,0,0.2);
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15vh;
  padding-bottom: 15vh;
`;

export const Flex = styled.div`
  display: flex;
  gap: 1rem;

  div {
    flex: 1;
  }
`;

export const DialogFormButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;

  button {
    color: #4A5173;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background-color: #FFF;
    border: 1px solid #4A5173;

    &:hover {
      color: #FFF;
    }
  }
`;

export const DialogLabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  gap: 0.5rem;

  input {
    margin: 0;
  }
  button {
    margin: 0 !important;
  }
`;

export const DialogLabel = styled.label`
  display: flex;
  gap: 0.5rem;
  align-items: baseline;
  justify-content: flex-start;
`;

export const DialogInput = styled.input`
    padding: 10px;
    border-radius: 3px;
    border: none;
    margin-top: 8px;
    transition: border 0.15s ease;
    font-size: 16px;
    border: 1px solid #BBB;

    &:focus {
      border: 1px solid #000;
    }
`;

export const DialogSpan = styled.span`
    font-size: 16px;
    line-height: 31px;
    letter-spacing: 0.07em;
`;

export const DialogHeader = styled.header`
  position: relative;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  h1 {
    font-weight: 500;
    font-weight: 800;
    font-size: 18px;
    line-height: 31px;
    letter-spacing: 0.07em;
    justify-content: center;
  }

  h2 {
    font-size: 12px;
  }

  button {
    margin: 30px 0 0;
    color: #4A5173;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background-color: #FFF;
    border: 1px solid #4A5173;

    &:hover {
      color: #FFF;
    }
  }
`;

export const DialogForm = styled.form`
  border-radius: 5px;
  padding: 40px;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
  overflow: auto;

  h1 {
    font-weight: 500;
    font-weight: 800;
    font-size: 18px;
    line-height: 31px;
    letter-spacing: 0.07em;
    justify-content: center;
  }

  h2 {
    font-size: 12px;
  }

  button {
    margin: 30px 0 0;
    color: #4A5173;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    background-color: #FFF;
    border: 1px solid #4A5173;

    &:hover {
      color: #FFF;
    }
  }
`;

export const DialogDotStepper = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const DialogDotStep = styled.div`
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgb(0,0,0);

  ${(props) => props.active && css`
    background-color: rgba(0,0,0,0.5);

    &:before {
      content: '';
      position: absolute;
      display: block;
      top: -50%;
      left: -50%;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: rgba(0,0,0,0.1);
    }
  `}
`;

export const SelectText = styled.div`
  font-style: normal;
  font-weight: normal;
  color: #000000;
  padding-bottom: .5vh;
`;

export const CodeText = styled.div`
  border: 1px solid #1e1f22;
  background-color: rgba(43, 45, 49, 0.8);
  color: white;
  padding: 10px;
  border-radius: 10px;
`;

export const materialUIStyle = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily,
    h3: {
      '&.appTitle': {
        marginBottom: 24,
      },
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
  },
});
