# Recalculate 是什么概念？

Recalculate（重新计算）概念解释

背景：Excel 文件存储了什么？

一个 Excel 文件中，带公式的单元格实际存储两样东西：

单元格 B10:
├── 公式字符串: "=SUM(A1:A9)"
└── 缓存的计算值: 450

当你用 Excel 软件打开文件时，它会自动重新计算所有公式，更新缓存值。

---
问题：openpyxl 只写公式，不算结果

from openpyxl import Workbook
wb = Workbook()
sheet = wb.active
sheet['A1'] = 100
sheet['A2'] = 200
sheet['B1'] = '=SUM(A1:A2)'  # 只写入了公式字符串
wb.save('test.xlsx')

保存后的文件：
单元格 B1:
├── 公式字符串: "=SUM(A1:A2)"  ✅ 有
└── 缓存的计算值: ???           ❌ 没有或为空

后果：
- 用 Excel 打开 → 正常显示 300（Excel 会自动计算）
- 用某些程序读取"值" → 可能得到空或 0
- 用 data_only=True 读取 → 得到 None

---
Recalculate 的作用

Recalculate = 让程序执行一遍所有公式，把结果值写入文件

执行前:                          执行后:
单元格 B1:                       单元格 B1:
├── 公式: "=SUM(A1:A2)"         ├── 公式: "=SUM(A1:A2)"
└── 值: (空)                    └── 值: 300

---
为什么需要 LibreOffice？

因为 openpyxl 没有公式计算引擎——它只是个文件读写库，不懂数学。

而 LibreOffice 是完整的办公软件，内置了 Excel 兼容的计算引擎。recalc.py 就是：

调用 LibreOffice（无界面模式）
    → 打开文件
    → calculateAll()  // 计算所有公式
    → 保存文件
    → 关闭

---
类比理解

| 角色        | 类比                                     |
|-------------|------------------------------------------|
| openpyxl    | 打字员：只负责把公式"抄"进文件           |
| LibreOffice | 会计：拿起计算器，把每个公式算出结果填上 |

如果你只用 openpyxl 生成文件，就像打字员交了一份只有公式没有答案的报表——格式对了，但数字是空的。Recalculate 就是让"会计"过一遍，把答案都填上。