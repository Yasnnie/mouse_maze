import { useEffect, useState } from "react";
import styled from "styled-components";

export default function MainContainer() {
  const [blockSize, setBlocKSize] = useState(0);

  const matriz = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 'm', 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 'e', 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  useEffect(() => {
    const wBlock = window.innerWidth / matriz[0].length;
    const hBlock = window.innerWidth / matriz.length;

    console.log("largura:" + wBlock);
    console.log("altura:" + hBlock);
    const size = (wBlock + hBlock) / 2;

    const porcent = size * 0.45;
    setBlocKSize(porcent);
  }, []);


  function SelectedType(value:any, x: number, y:number){
    if(value == "m"){
        return <Mouse x={x} y={y} size={blockSize}/>
    }

    if(value == 0){
        return<></>
    }

    if(value == "e"){
        return <End x={x} y={y} size={blockSize}/>
    }
    
    return <Wall x={x} y={y} size={blockSize}/>
  }

  return (
    <Main>
      {matriz.map((row, y) =>
        row.map((value, x) =>
         SelectedType(value,x,y)
        )
      )}
    </Main>
  );
}

export const Main = styled.main`
  width: 100vw;
  min-height: 100vh;
  background: rgb(255, 255, 131);
  position: relative;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
`;

const Wall = styled.div<{ size: number; x: number; y: number }>`
  position: absolute;
  width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  top: ${({ size, y }) => size * y + "px"};
  left: ${({ size, x }) => size * x + "px"};
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;


const Mouse = styled(Wall)`
background: red;
`

const End = styled(Wall)`
background: Blue;
`