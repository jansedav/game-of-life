import React, {FC, useState, useEffect} from 'react'
import styled from 'styled-components';

type TSProps={
    columns: number,
    rows: number
}

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
`;

const GridWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const GridBlock = styled.div`
    cursor: pointer;
    border: 1px solid #000;
    width: 10px;
    height: 10px;
`;

const StartButton = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 40px;
    font-size: 22px;
    background: #007fff;
    color: #fff;
    border-radius: 4px;
    margin-top: 20px;
    transition: all 0.2s ease-in-out;
    &:hover {
        background: #0859ff;
    }
`;

const Grid:FC<TSProps> = (props) => {
    const [grid, setGrid] = useState<number[][]>([[]]);

    useEffect(() => {
        let initializeArray = new Array(props.rows);
        let i:number;

        for(i = 0; i < props.rows; i++){
            initializeArray[i] = new Array(props.columns).fill(0);
        };

        setGrid(initializeArray);

    }, [props.columns, props.rows]);

    const handleGridBlockClick = (index1:number, index2:number) => {
        let tempArray = grid.slice();

        tempArray[index1][index2] = tempArray[index1][index2] === 0 ? 1 : 0;

        setGrid(tempArray);
    }

    const handleStart = () => {
        let changedArray = grid.slice();
        let i:number,j:number;
        for(i = 0; i < props.rows - 1; i++){
            for(j = 0; j < props.columns - 1; j++){
                changedArray[i][j] = handleAmIAlive(grid[i][j], getNeighborCounter(i, j, grid[i][j]));
            };
        };
        setGrid(changedArray);
    }

    const handleAmIAlive = (amIAlive:number, neighborCount:number) => {
        if(neighborCount > 4 || neighborCount < 3){
            return 0;
        }
        else if(amIAlive === 0 && neighborCount === 3){
            return 1;
        }
        else{
            return amIAlive;
        }
    }

    const getNeighborCounter = (row:number, col:number, amIAlive:number) => {
        let totalNeighbours = 0;

        if(row > 0){
            totalNeighbours += grid[row -1][col];
        }

        if(row > 0 && col < props.columns - 1){
            totalNeighbours += grid[row -1][col + 1];
        }

        if(row > 0 && col > 0){
            totalNeighbours += grid[row -1][col - 1];
        }

        if(row < props.rows - 1 && col > 0){
            totalNeighbours += grid[row + 1][col - 1];
        }

        if(row < props.rows - 1){
            totalNeighbours += grid[row + 1][col];
        }

        if(row < props.rows - 1 && col < props.columns - 1){
            totalNeighbours += grid[row + 1][col + 1];
        }
 
        if(col > 0){
            totalNeighbours += grid[row][col - 1];
        }

        if( col < props.columns - 1){
            totalNeighbours += grid[row][col + 1];
        }

        if(amIAlive === 1){
            totalNeighbours += amIAlive;
        }
        
        return totalNeighbours;
    }


    return(
        <Wrapper> 
                {
                    grid.map((item1, index1) =>(
                        <GridWrapper key={index1 + 'row'}>
                            {
                                grid.map((item2, index2) => 
                                    <GridBlock key={index1 + 'block' + index2} onClick={() => handleGridBlockClick(index1, index2)} style={{background: grid[index1][index2] ? '#007fff' : '#fff'}}/>
                                )
                            }
                        </GridWrapper>
                    ))
                }
                <StartButton onClick={() => handleStart()}> Start </StartButton>
        </Wrapper>
    );
}

export default Grid;