/* --tile-size: 48px;
--helmet-offset: 12px;
--game-size: calc(var(--tile-size) * 20); */

const TILE_SIZE = 48;
const HELMET_OFFSET = 12;
const GAME_SIZE = TILE_SIZE * 20;

const root = document.documentElement;

root.style.setProperty('--tile-size', `${TILE_SIZE}px`);
root.style.setProperty('--helmet-offset', `${HELMET_OFFSET}px`);
root.style.setProperty('--game-size:', `${GAME_SIZE}px`)

function createBoard (){
    const boardElement = document.getElementById('board')
    const elements = [];


    function createElement(options){
        let { item, top, left } = options;

        const currentElement = { item, currentPosition:{top, left}}
         
        elements.push(currentElement)

        const htmlElement = document.createElement('div');
        htmlElement.className = item;
        htmlElement.style.top = top + 'px';
        htmlElement.style.left = left + 'px';

        boardElement.appendChild(htmlElement);

        function getNewDirection (buttonPressed, position){
            switch (buttonPressed){
                case 'ArrowUp':
                    return {top: position.top - TILE_SIZE, left: position.left};
                case 'ArrowRight':
                    return {top: position.top, left: position.left + TILE_SIZE};
                case 'ArrowLeft':
                    return {top: position.top, left: position.left - TILE_SIZE};
                case 'ArrowDown':
                    return {top: position.top + TILE_SIZE, left: position.left};

                default: 
                return position;
            }
        }

        function validateMovement(position, conflictItem){
            return (
                position.left >= 48 &&
                position.left <= 864 &&
                position.top >= 96 &&
                position.top <= 816 &&
                conflictItem?.item !== 'forniture'
            )
        }

        function getMovementConflict(position, els){
            const conflictItem = els.find((currentElement) => {
                return (
                    currentElement.currentPosition.top === position.top &&
                    currentElement.currentPosition.left === position.left
                )
            })

            return conflictItem;
        }

        function validateConflicts(currentEl, conflictItem){

            function finishGame(message){
                setTimeout(() => {                                      
                    alert(message);
                    location.reload();
                }, 100)

            }

            if (currentEl.item === 'hero'){
                if (
                    conflictItem?.item === 'mini-demon' ||
                    conflictItem?.item === 'trap'
                ){
                    finishGame("Você morreu!!");
                }
                if(conflictItem?.item === 'chest'){
                    finishGame("Você venceu!!");
                }
            }

            if(currentEl?.item === 'mini-demon' && conflictItem?.item === 'hero'){
                finishGame("Você morreu!!");
            }
        }

        function move(buttonPressed){
            const newPosition = getNewDirection(buttonPressed, currentElement.currentPosition)
            const conflictItem = getMovementConflict(newPosition, elements)
            const isValidMovement = validateMovement(newPosition, conflictItem)

            if (isValidMovement){
                currentElement.currentPosition = newPosition
                htmlElement.style.top = `${newPosition.top}px`;
                htmlElement.style.left = `${newPosition.left}px`;

                validateConflicts(currentElement, conflictItem);
            }
        }

        return {
            move: move,
        }
    }

    function createItem(options){
        createElement(options)
    }
    
    function createHero(options){
        const hero = createElement({
            item:'hero',
            top: options.top,
            left: options.left,
        });

        document.addEventListener('keydown', (event) => {
            hero.move(event.key)
        })
    }

    function createEnemy(options){
        const enemy = createElement({
            item:'mini-demon',
            top: options.top,
            left: options.left,
        })

        setInterval(() => {
            const direction = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']
            const randomIndex = Math.floor(Math.random() * direction.length);
            const randomDirection = direction[randomIndex]
         
            enemy.move(randomDirection)
        }, 1000)
    }

    return{
        createItem: createItem,
        createHero: createHero,
        createEnemy: createEnemy
    }
}

const board = createBoard()

board.createItem({ item: 'trap', top: TILE_SIZE * 4, left: TILE_SIZE * 2 })
board.createItem({ item: 'trap', top: TILE_SIZE * 6, left: TILE_SIZE * 18 })
board.createItem({ item: 'trap', top: TILE_SIZE * 9, left: TILE_SIZE * 5 })
board.createItem({ item: 'trap', top: TILE_SIZE * 13, left: TILE_SIZE * 15 })
board.createItem({ item: 'trap', top: TILE_SIZE * 16, left: TILE_SIZE * 13 })
board.createItem({ item: 'trap', top: TILE_SIZE * 16, left: TILE_SIZE * 8 })
board.createItem({ item: 'trap', top: TILE_SIZE * 7, left: TILE_SIZE * 8 })
board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 10 })
board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 12 })
board.createItem({ item: 'trap', top: TILE_SIZE * 6, left: TILE_SIZE * 12 })
board.createItem({ item: 'trap', top: TILE_SIZE * 7, left: TILE_SIZE * 17 })
board.createItem({ item: 'trap', top: TILE_SIZE * 13, left: TILE_SIZE * 10 })
board.createItem({ item: 'trap', top: TILE_SIZE * 15, left: TILE_SIZE * 11 })
board.createItem({ item: 'trap', top: TILE_SIZE * 10, left: TILE_SIZE * 10 })
board.createItem({ item: 'trap', top: TILE_SIZE * 9, left: TILE_SIZE * 9 })
board.createItem({ item: 'trap', top: TILE_SIZE * 2, left: TILE_SIZE * 14 })
board.createItem({ item: 'trap', top: TILE_SIZE * 3, left: TILE_SIZE * 15 })
board.createItem({ item: 'trap', top: TILE_SIZE * 15, left: TILE_SIZE * 4 })

board.createItem({ item: 'chest', top: TILE_SIZE * 2, left: TILE_SIZE * 18 })

board.createItem({ item: 'forniture', top: TILE_SIZE * 17, left: TILE_SIZE * 2 })
board.createItem({ item: 'forniture', top: TILE_SIZE * 2, left: TILE_SIZE * 8 })
board.createItem({ item: 'forniture', top: TILE_SIZE * 2, left: TILE_SIZE * 16 })
board.createItem({ item: 'forniture', top: TILE_SIZE * 2, left: TILE_SIZE * 3 })

board.createEnemy({ top: TILE_SIZE * 10, left: TILE_SIZE * 2 })
board.createEnemy({ top: TILE_SIZE * 4, left: TILE_SIZE * 5 })
board.createEnemy({ top: TILE_SIZE * 6, left: TILE_SIZE * 6 })
board.createEnemy({ top: TILE_SIZE * 8, left: TILE_SIZE * 16 })
board.createEnemy({ top: TILE_SIZE * 9, left: TILE_SIZE * 18 })
board.createEnemy({ top: TILE_SIZE * 13, left: TILE_SIZE * 2 })
board.createEnemy({ top: TILE_SIZE * 15, left: TILE_SIZE * 12 })
board.createEnemy({ top: TILE_SIZE * 17, left: TILE_SIZE * 8 })
board.createEnemy({ top: TILE_SIZE * 6, left: TILE_SIZE * 13 })
board.createEnemy({ top: TILE_SIZE * 3, left: TILE_SIZE * 14 })
board.createEnemy({ top: TILE_SIZE * 9, left: TILE_SIZE * 6 })
board.createEnemy({ top: TILE_SIZE * 4, left: TILE_SIZE * 16 })
board.createEnemy({ top: TILE_SIZE * 6, left: TILE_SIZE * 17 })
board.createEnemy({ top: TILE_SIZE * 9, left: TILE_SIZE * 15 })
board.createEnemy({ top: TILE_SIZE * 3, left: TILE_SIZE * 15 })
board.createEnemy({ top: TILE_SIZE * 14, left: TILE_SIZE * 15 })
board.createEnemy({ top: TILE_SIZE * 17, left: TILE_SIZE * 8 })
board.createEnemy({ top: TILE_SIZE * 15, left: TILE_SIZE * 7 })
board.createEnemy({ top: TILE_SIZE * 16, left: TILE_SIZE * 6 })
board.createEnemy({ top: TILE_SIZE * 17, left: TILE_SIZE * 16 })
board.createEnemy({ top: TILE_SIZE * 8, left: TILE_SIZE * 12 })
board.createEnemy({ top: TILE_SIZE * 10, left: TILE_SIZE * 9 })
board.createEnemy({ top: TILE_SIZE * 10, left: TILE_SIZE * 10 })
board.createEnemy({ top: TILE_SIZE * 16, left: TILE_SIZE * 17 })

board.createHero({ top: TILE_SIZE * 16, left: TILE_SIZE * 2 })



const reset = document.querySelector('.reset')

function resetPosition (){
    reset.addEventListener('click', () => {
        location.reload()
    })
}
resetPosition()
