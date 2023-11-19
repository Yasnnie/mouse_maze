import { useEffect, useState } from "react";
import styled from "styled-components";
import { Stack } from "../../utils/stack";
interface mouseMazeType {
  value: number | string;
  x: number;
  y: number;
  checked: boolean;
}

export default function MainContainer() {
  const [blockSize, setBlocKSize] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState({ x: 0, y: 0 });
  const [mouse_maze, setMouse_maze] = useState<mouseMazeType[]>([]);
  const [matriz, setMatriz] = useState<Array<any[]>>([]);
  const pilha = new Stack();

  useEffect(() => {
    if (matriz.length > 0) {
      // Tamanho do layout

      const wBlock = window.innerWidth / matriz[0].length;
      const hBlock = window.innerWidth / matriz.length;
      const size = (wBlock + hBlock) / 2;

      const porcent = size * 0.45;
      console.log(porcent);
      setBlocKSize(porcent);

      //Gerar a nova array
      generateMaze();
    }
  }, [matriz]);

  useEffect(() => {
    if (mouse_maze.length > 0) {
      if (mousePosition != endPosition) {
        let new_mouse_maze = [...mouse_maze];

        setTimeout(() => {
          const array: number[] = [
            getIndex(mousePosition.x + 1, mousePosition.y),
            getIndex(mousePosition.x - 1, mousePosition.y),
            getIndex(mousePosition.x, mousePosition.y - 1),
            getIndex(mousePosition.x, mousePosition.y + 1),
          ];

          array.every((i) => {
            if (
              new_mouse_maze[i] &&
              new_mouse_maze[i].value != 1 &&
              !new_mouse_maze[i].checked
            ) {
              console.log("pode ir:" + i);
              new_mouse_maze[i] = { ...new_mouse_maze[i], checked: true };
              setMouse_maze(new_mouse_maze);
              setMousePosition(new_mouse_maze[i]);

              return false;
            }

            return true;
          });
        }, 1000);
      } else {
        alert("Terminou");
      }
    }
  }, [mousePosition, matriz]);

  function getIndex(queryX: number, queryY: number) {
    return mouse_maze.findIndex(({ x, y }) => x == queryX && y == queryY);
  }

  function generateMaze() {
    const array: mouseMazeType[] = [];

    matriz.map((row, y) => {
      row.map((value, x) => {
        if (value == "m") setMousePosition({ x: x, y: y });
        if (value == "e") setEndPosition({ x: x, y: y });

        array.push({ value: value, x: x, y: y, checked: false });
      });
    });

    setMouse_maze(array);
  }

  //Renderizar se é parede, rato ou espaço em branco
  function SelectedType(value: any, x: number, y: number, index: number) {
    if (value == "m") {
      return (
        <Mouse
          key={index}
          x={mousePosition.x}
          y={mousePosition.y}
          size={blockSize}
        />
      );
    }

    if (value == 0) {
      return <Caminho x={x} key={index} y={y} size={blockSize} />;
    }

    if (value == "e") {
      return <End x={x} y={y} size={blockSize} key={index} />;
    }

    return <Wall x={x} y={y} size={blockSize} key={index} />;
  }

  //Transformar a array de string em array de número
  function transformNumber(array: any) {
    const new_array: any = [];
    array.forEach((e: any) => {
      new_array.push(Number(e));
    });

    return new_array;
  }

  //Pegar o arquivo
  function handleFile(e: any) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      let data = event.target.result;
      const new_data = data.split("\n");

      const [array_x, array_y] = transformNumber(new_data[0].split(" "));
      new_data.shift();

      const new_matriz = [];

      for (let i = 0; i < array_y; i++) {
        const new_row = [];
        for (let j = 0; j < array_x; j++) {
          let value = new_data[i][j];
          if (value != "m" && value != "e") value = Number(value);

          new_row.push(value);
        }
        new_matriz.push(new_row);
      }

      setMatriz(new_matriz);
    };

    reader.readAsText(e.target.files[0]);
  }

  return (
    <Main>
      <input type="file" onChange={handleFile} />
      <button onClick={() => setMousePosition(endPosition)}>resolver</button>
      <MapContainer>
        {mouse_maze.map((e, index) => SelectedType(e.value, e.x, e.y, index))}
      </MapContainer>
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

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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
  transition: 0.2s;
`;

const Caminho = styled.div<{
  size: number;
  x: number;
  y: number;
  check?: number;
}>`
  position: absolute;
  width: ${({ size }) => size + "px"};
  height: ${({ size }) => size + "px"};
  top: ${({ size, y }) => size * y + "px"};
  left: ${({ size, x }) => size * x + "px"};
  background: ${({ check }) => (check ? "green" : "transparent")};
`;

const Mouse = styled(Wall)`
  background: red;
  z-index: 3;
`;

const End = styled(Wall)`
  background: Blue;
`;
