import React from "react";

// busyTableIds — массив id занятых столов
// onTableClick — обработчик клика по свободному столу
const HallScheme = ({ busyTableIds = [], onTableClick }) => (
  <div
    style={{
      boxSizing: 'border-box',
      position: 'absolute',
      width: 332,
      height: 546,
      left: 28,
      top: 192,
      border: '2px solid #F1F1F1',
      borderRadius: 20,
      background: '#fff',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <svg width="284" height="500" viewBox="0 0 284 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Стол 1 */}
      <g>
        <rect
          x="244" y="16" width="41" height="24" rx="3" transform="rotate(90 244 16)"
          fill={busyTableIds.includes(1) ? "#FFDAD1" : "#BABABA"}
          data-table-id="1"
          style={{ cursor: busyTableIds.includes(1) ? "not-allowed" : "pointer" }}
          onClick={() => !busyTableIds.includes(1) && onTableClick(1)}
        />
        <text
          x="256" y="36"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="14"
          fill="#303030"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
          dominantBaseline="middle"
        >1</text>
      </g>
      {/* Стол 2 */}
      <g>
        <rect
          x="24" y="114" width="41" height="24" rx="3"
          fill={busyTableIds.includes(2) ? "#FFDAD1" : "#BABABA"}
          data-table-id="2"
          style={{ cursor: busyTableIds.includes(2) ? "not-allowed" : "pointer" }}
          onClick={() => !busyTableIds.includes(2) && onTableClick(2)}
        />
        <text
          x="44.5" y="126"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="14"
          fill="#303030"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >2</text>
      </g>
      {/* Стол 3 */}
      <g>
        <rect
          x="24" y="174" width="41" height="24" rx="3"
          fill={busyTableIds.includes(3) ? "#FFDAD1" : "#BABABA"}
          data-table-id="3"
          style={{ cursor: busyTableIds.includes(3) ? "not-allowed" : "pointer" }}
          onClick={() => !busyTableIds.includes(3) && onTableClick(3)}
        />
        <text
          x="44.5" y="186"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="14"
          fill="#303030"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >3</text>
      </g>
      {/* Стол 4 */}
      <g>
        <rect
          x="24" y="324" width="41" height="24" rx="3"
          fill={busyTableIds.includes(4) ? "#FFDAD1" : "#BABABA"}
          data-table-id="4"
          style={{ cursor: busyTableIds.includes(4) ? "not-allowed" : "pointer" }}
          onClick={() => !busyTableIds.includes(4) && onTableClick(4)}
        />
        <text
          x="44.5" y="336"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="14"
          fill="#303030"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >4</text>
      </g>
      {/* Стол 5 */}
      <g>
        <rect
          x="24" y="384" width="41" height="24" rx="3"
          fill={busyTableIds.includes(5) ? "#FFDAD1" : "#BABABA"}
          data-table-id="5"
          style={{ cursor: busyTableIds.includes(5) ? "not-allowed" : "pointer" }}
          onClick={() => !busyTableIds.includes(5) && onTableClick(5)}
        />
        <text
          x="44.5" y="396"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize="14"
          fill="#303030"
          fontFamily="Inter, sans-serif"
          fontWeight="600"
        >5</text>
      </g>
      {/* ... Добавьте остальные столы по аналогии ... */}
    </svg>
  </div>
);

export default HallScheme; 