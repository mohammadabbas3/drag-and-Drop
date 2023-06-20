import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const DragDropQuiz = () => {
    const [spots, setSpots] = useState([
        { id: 1, x: '0%', y: '0%', offsetX: 0, offsetY: 0, circle: null },
        { id: 2, x: '50%', y: '90%', offsetX: 0, offsetY: 0, circle: null },
    ])
    const [draggedSpots, setDraggedSpots] = useState({})
    console.log('spots-->', spots)

    const DraggableCircle = ({ id }) => {
        const [{ isDragging }, drag] = useDrag({
            type: 'circle',
            item: { id },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        })

        return (
            <div
                ref={drag}
                style={{
                    backgroundColor: 'red',
                    opacity: isDragging ? 0.5 : 1,
                    width: '10%',
                    height: '10%',
                    borderRadius: '50%',
                    cursor: 'move',
                    position: 'absolute',
                }}
            ></div>
        );
    };
    const DraggableCircle2 = ({ id }) => {
        const [{ isDragging }, drag] = useDrag({
            type: 'circle',
            item: { id },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        })
        return (
            <div
                ref={drag}
                style={{
                    backgroundColor: 'red',
                    opacity: isDragging ? 0.5 : 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    cursor: 'move',
                    position: 'absolute',
                }}
            ></div>
        );
    };

    const DropZone = (data) => {
        const { spot } = data
        // const DropZone = ({ spot }) => {
        const [{ canDrop, isOver }, drop] = useDrop({
            accept: 'circle',
            drop: (item, monitor) => {
                setDraggedSpots(spot)
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        })

        const isActive = canDrop && isOver
        const backgroundColor = isActive ? 'lightgreen' : 'orange'

        const style = {
            position: 'absolute',
            // position: 'relative',
            opacity:0.7,
            left: spot.x,
            top: spot.y,
            width: '10%',
            height: '10%',
            backgroundColor,
            borderRadius: '50%',
            // border: '1px solid black',
            zIndex: isActive ? 1 : 'auto',
        }

        return (
            <div ref={drop} style={style}>
                {draggedSpots?.id === spot.id && (
                    <DraggableCircle2 id={1} />
                )}
            </div>
        );
    };

    return (
        <div>
            <h1>Drag and Drop Quiz</h1>
            <div>
                <h2>Question</h2>
            </div>
            <div style={{ position: 'relative' }}>
                <h2>Answer</h2>
                <div >
                    <h3>Drag the circle to the spot on the image:</h3>
                </div>

                <div style={{ backgroundImage: `url(http://i54.tinypic.com/4zuxif.jpg)`, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', width: 500, height: 500, border: '2px solid lightgreen', position: 'relative' }}>
                    {spots.map((spot) => (
                        <DropZone
                            key={spot.id}
                            spot={spot}
                            imageUrl="https://res.cloudinary.com/abbas-docs/image/upload/v1661032500/m0gf83wjnnah7tv821pt.png"
                        />
                    ))}
                </div>
                {!draggedSpots?.id &&
                    <div style={{ width: 500, height: 500, position: 'relative' }}>
                        <DraggableCircle id={1} />
                    </div>
                }
                <br />
                <br />
                <br />
            </div>
        </div>
    );
};


export default DragDropQuiz;
