const chessContainer = document.querySelector("#root");

let selectedPiece = null;

const createChessBoard = () => {
    const squares = [];
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const isLightSquare = (row + col) % 2 !== 1;
            const square = document.createElement("div");
            square.className = isLightSquare ? "square light" : "square dark";
            square.dataset.row = row;
            square.dataset.col = col;
            squares.push(square);

            chessContainer.appendChild(square);
        }
    }
    return squares;
}

const addPieces = (squares) => {
    const initialBoard = [
        "black-rook", "black-knight", "black-bishop", "black-queen", "black-king", "black-bishop", "black-knight", "black-rook",
        "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn", "black-pawn",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "", "", "", "", "", "", "", "",
        "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn", "white-pawn",
        "white-rook", "white-knight", "white-bishop", "white-queen", "white-king", "white-bishop", "white-knight", "white-rook"
    ];

    for (let i = 0; i < initialBoard.length; i++) {
        if (initialBoard[i]) {
            const piece = document.createElement("img");
            piece.className = "piece";
            piece.src = `images/${initialBoard[i]}.svg`; // Path to your SVGs
            squares[i].appendChild(piece);

            piece.addEventListener('click', (e) => {
                e.stopPropagation();
                handlePieceClick(e.target);
            });
        }

        squares[i].addEventListener('click', () => {
            handleSquareClick(squares[i]);
        });
    }
}

const handlePieceClick = (piece) => {
    if (selectedPiece) {
        // Deselect previous piece
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
    }

    // Select the new piece
    selectedPiece = piece;
    selectedPiece.classList.add('selected');
    console.log(`Piece clicked: ${piece.src}`);
}

const handleSquareClick = (square) => {
    if (selectedPiece) {
        // Move the selected piece to the clicked square
        const oldSquare = selectedPiece.parentElement;
        oldSquare.removeChild(selectedPiece);
        square.appendChild(selectedPiece);

        // Deselect the piece
        selectedPiece.classList.remove('selected');
        selectedPiece = null;
        console.log(`Moved piece to row ${square.dataset.row}, col ${square.dataset.col}`);
    }
}

const squares = createChessBoard();
addPieces(squares);
