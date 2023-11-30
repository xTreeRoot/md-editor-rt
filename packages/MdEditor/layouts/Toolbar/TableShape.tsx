import React, { useState } from 'react';
import { prefix } from '~/config'; // 导入前缀配置

export interface HoverData {
  x: number; // x 坐标
  y: number; // y 坐标
}

interface TableShapeProps {
  tableShape: [number, number]; // 表格形状，由行数和列数组成的元组
  onSelected: (data: HoverData) => void; // 选中时的回调函数，参数为 HoverData 类型
}

const TableShape = (props: TableShapeProps) => {
  const [hoverPosition, setHoverPosition] = useState<HoverData>({ // 使用useState定义hoverPosition状态
    x: -1, // 初始x坐标为-1
    y: -1, // 初始y坐标为-1
  });

  return (
    <div
      className={`${prefix}-table-shape`} // 使用前缀配置拼接className
      onMouseLeave={() => {
        setHoverPosition({ // 鼠标离开时更新hoverPosition状态
          x: -1, // x坐标设为-1
          y: -1, // y坐标设为-1
        });
      }}
    >
      {new Array(props.tableShape[1]).fill('').map((_, rowIndex) => ( // 根据行数创建表格行
        <div className={`${prefix}-table-shape-row`} key={`table-shape-row-${rowIndex}`}>
          {new Array(props.tableShape[0]).fill('').map((_, colIndex) => ( // 根据列数创建表格列
            <div
              className={`${prefix}-table-shape-col`} // 使用前缀配置拼接className
              key={`table-shape-col-${colIndex}`}
              onMouseEnter={() => {
                setHoverPosition({ // 鼠标进入时更新hoverPosition状态
                  x: rowIndex, // x坐标设为当前行索引
                  y: colIndex, // y坐标设为当前列索引
                });
              }}
              onClick={() => {
                props.onSelected(hoverPosition); // 点击时调用父组件传入的onSelected回调，传入当前的hoverPosition
              }}
            >
              <div
                className={[
                  `${prefix}-table-shape-col-default`,
                  rowIndex <= hoverPosition.x && // 如果行索引小于等于鼠标悬停的行索引
                  colIndex <= hoverPosition.y && // 且列索引小于等于鼠标悬停的列索引
                  `${prefix}-table-shape-col-include` // 则添加包含样式类名
                ]
                  .filter((c) => !!c)
                  .join(' ')}
              ></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableShape;
