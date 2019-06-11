import styled from "styled-components";

const Button = styled.button`
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 0.84rem 2.14rem;
  font-size: 0.81rem;
  -webkit-transition: color 0.15s ease-in-out,
    background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  -o-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
  margin: 0.375rem;
  border: 0;
  -webkit-border-radius: 0.125rem;
  border-radius: 0.125rem;
  cursor: pointer;
  text-transform: uppercase;
  white-space: normal;
  word-wrap: break-word;
  color: inherit;

  border: 2px solid #5c6bc0;
  background-color: transparent;
  color: #5c6bc0;

  font-size: 0.7rem;

  padding-top: 0.7rem;
  padding-bottom: 0.7rem;
  transition: all 0.5s ease-in-out;

  &:hover {
    background-color: #5c6bc0;
    color: white;
    outline: none;
  }
`;

const LineLoader = styled.div`
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: #ffffff;
  padding: 5rem 0;

  &:before {
    display: block;
    position: absolute;
    content: "";
    left: -200px;
    width: 200px;
    height: 4px;
    background-color: #283693;
    animation: loading 2s linear infinite;
  }

  @keyframes loading {
    from {
      left: -200px;
      width: 30%;
    }
    50% {
      width: 30%;
    }
    70% {
      width: 70%;
    }
    80% {
      left: 50%;
    }
    95% {
      left: 120%;
    }
    to {
      left: 100%;
    }
  }
`;

const Card = styled.div`
  .card {
    transition: all 0.5s ease-in-out;

    &:hover {
      background-color: ${props => (props.hover ? "#283693" : "inherit")};
      color: ${props => (props.hover ? "#ffffff" : "inherit")};

      cursor: pointer;
      transform: scale(1.02);
    }
  }
  .card-body {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .card-title {
    font-family: "Concert One", cursive;
    font-size: 1rem;
    font-weight: bolder;
  }
`;

const PreLoader = styled.div`
  margin: 5rem 0;
`;

export { Button, LineLoader, Card, PreLoader };