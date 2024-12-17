import { useEffect, useState } from 'react'
import 'uno.css'
import '@unocss/reset/tailwind.css'

const BINGO_DATA = [
  "家里是农村户口", "没有房产证", "没穿过2000元以上的西装", "没戴过10000元以上的手表", "幻想中过彩票一等奖",
  "没拥有过一辆30万以上的车", "买东西要找全网最低价", "没坐过头等舱进行长途旅行", "没住过一晚1100元以上的顶级酒店", "没拥有过一块私人定制名表",
  "好评返现超过10次", "没穿过3500元以上的皮鞋", "单次通勤时间>1小时", "喜欢和人比穷", "没拥有过限量版名牌包包",
  "上班不敢随便请假", "没参加过私人游艇派对", "天天幻想世界毁灭", "网上关注账号教赚羊毛", "没在私人酒庄品尝过顶级红酒",
  "账单消费最多是餐饮日用品", "没拥有过千万别墅", "没戴过1万元以上的项链", "没穿过3万元以上的皮草", "最大的娱乐是蹭吃蹭到"
]

interface Cell {
  content: string;
  selected: boolean;
}

function App() {
  const [cells, setCells] = useState<Cell[]>(
    BINGO_DATA.map(content => ({ content, selected: false }))
  );
  const [hasWinningLine, setHasWinningLine] = useState(false);

  useEffect(() => {
    fetch('/.netlify/functions/test')
  }, [])

  const checkWinningLines = (selectedCells: Cell[]) => {
    // 检查横向
    for (let i = 0; i < 5; i++) {
      if (selectedCells.slice(i * 5, (i + 1) * 5).every(cell => cell.selected)) {
        return true;
      }
    }
    // 检查纵向
    for (let i = 0; i < 5; i++) {
      if ([0,1,2,3,4].every(j => selectedCells[i + j * 5].selected)) {
        return true;
      }
    }
    // 检查对角线
    if ([0,6,12,18,24].every(i => selectedCells[i].selected)) return true;
    if ([4,8,12,16,20].every(i => selectedCells[i].selected)) return true;
    
    return false;
  };

  const handleCellClick = (index: number) => {
    const newCells = [...cells];
    newCells[index] = { ...newCells[index], selected: !newCells[index].selected };
    setCells(newCells);
    setHasWinningLine(checkWinningLines(newCells));
  };

  const handleSubmit = () => {
    if (hasWinningLine) {
      alert('恭喜你！请享受你的穷B人生！');
    } else {
      alert('很遗憾，你不用享受穷B人生了');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold text-center mb-2 sm:mb-4">
        穷B Bingo游戏
        <div className="text-xs sm:text-sm font-normal mt-1 sm:mt-2">五个统一一条线即可享受穷B人生</div>
      </h1>
      
      <div className="grid grid-cols-5 gap-1 sm:gap-2 mb-4">
        {cells.map((cell, index) => (
          <div
            key={index}
            onClick={() => handleCellClick(index)}
            className={`
              p-1 sm:p-2 border rounded cursor-pointer 
              text-xs sm:text-base
              min-h-16 sm:min-h-24 
              flex items-center justify-center text-center
              transition-colors duration-200
              ${cell.selected ? 'bg-green-500/20' : 'bg-gray-100 hover:bg-gray-200'}
            `}
          >
            {cell.content}
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleSubmit}
          className="w-[80%] sm:w-[50%] bg-blue-500 hover:bg-blue-700 text-white font-bold 
                   py-2 px-4 rounded text-sm sm:text-base"
        >
          提交
        </button>
      </div>
    </div>
  )
}

export default App
