# Design System: Inkpai Checkout (收银台设计系统规范)
**Brand / Ecosystem:** Meyracle Studio (`https://meyracle.com`)  
**Target Surface:** Inkpai Plus 结账 / 收银台界面 (Waffo / Pancake Checkout / Embedded Modal)  
**Reference Domain:** `https://meyracle.com`

---

## 1. Visual Theme & Atmosphere (设计主题与视觉氛围)

Inkpai 结账界面承袭 Meyracle 官网与 Inkpai 工具一贯的**极简、克制、理性、宁静的书卷与工具质感 (Quiet Utilitarian & Editorial Calm)**。

- **整体调性：** 拒绝喧闹的营销感、廉价的渐变霓虹与强行推销的紧迫感倒计时；整体呈现如同一间采光通透、井井有条的设计与出版工作室。
- **空间感与密度：** 呼吸感适中（Density: 4/10），左右分栏对称平衡或单列上下清晰递进。左侧交代清晰的产品权益与计费明细，右侧提供安全、专注、低摩擦的支付表单输入。
- **质感特征：** 
  - 纯粹的象牙米灰温润底色与纯白卡片容器互为衬托；
  - 极细的浅灰结构分割线（1px hairline borders）；
  - 全局采用扁平或微弱漫反射轻柔投影，杜绝发光与重阴影；
  - 控件采用胶囊药丸形（Pill-shaped, `9999px`）或现代圆角矩形（`16px`–`24px`），体现当代专业软件的温和亲和力。

---

## 2. Color Palette & Roles (色彩系统与功能角色)

Meyracle 严格遵循严谨的中性灰阶基底，绝不混用冷暖灰，无多余高饱和色彩干扰，确保买家在结账时拥有最大的安全感与专注度。

### Primary Surfaces (基础表面色)
- **Warm Canvas (页面底色):** `#F5F5F0`  
  *应用：* 整个结账页面的外层全屏背景，温润自然的象牙米灰，消除刺眼的冰冷白光。
- **Pure Surface (卡片与面板背景):** `#FFFFFF`  
  *应用：* 结账主面板容器、输入框表面、订单摘要主容器，形成清晰的前后层级。
- **Elevated Warm Surface (悬浮/浅浅强调卡片):** `#FFF9F5` / `#FBFAF6`  
  *应用：* 优惠信息提示、重要权益说明模块、悬浮弹窗微背景。
- **Peach Tint (品牌温和辅色):** `#FFE5D9`  
  *应用：* 微提示背景、极小面积的温暖点缀。

### Text & Contrast (文字阶度体系)
- **Charcoal Ink (主要文字 / 标头 / 价格):** `#111111`  
  *应用：* 页面主标题（H1/H2）、订单金额总计、产品名称、关键字段标签，深邃沉稳（避免死黑 `#000000`）。
- **Graphite Secondary (次级说明文字):** `#5C5C5C`  
  *应用：* 订阅周期说明、包含权益列表文字、表单辅助说明文案。
- **Muted Stone (弱化元数据 / 占位符):** `#8A8A8A`  
  *应用：* 输入框 Placeholder、已选国家提示、版权与商户声明小字（11px/12px）。

### Borders & Dividers (边框与分割线)
- **Subtle Border (标准浅边框):** `#E5E5E5`  
  *应用：* 输入框默认边框、卡片外描边、分隔线、折叠项分割。
- **Border Strong (聚焦与次级描边):** `#CCCCCC` (聚焦或 Hover 时转为 `#111111`)  
  *应用：* 输入框选中状态、可交互按钮边框。

### Interactive & CTA (核心交互与按钮)
- **Primary CTA Black (主按钮背景):** `#111111`  
  *应用：* 「继续」、「立即支付」、「确认订阅」主操作按钮。
- **Primary CTA Text (主按钮文本):** `#FFFFFF`  
  *应用：* 主操作按钮上的白色文字（字重 Medium 500）。
- **CTA Hover (按钮悬停态):** `#333333` (或 `opacity: 0.88`)。
- **Focus Ring (表单聚焦轮廓):** `#111111` (2px 细环，Offset 2px)。

### Functional States (系统反馈与安全标识)
- **Success Forest (成功与安全绿):** `#2F6F4E`  
  *应用：* 支付安全锁图标、7 天试用免计费标签、对勾权益标记 (`✓`)。
- **Error Rust (表单校验错误红):** `#DC2626`  
  *应用：* 邮箱格式错误、银行卡支付失败提示。

### Dark Mode (暗色模式配置，可选支持)
- **Dark Canvas (暗色底色):** `#0A0A0A`
- **Dark Surface (暗色卡片):** `#151515`
- **Dark Elevated (暗色容器):** `#1C1C1C`
- **Dark Border (暗色边框):** `#292929`
- **Dark Text Primary:** `#F5F5F5`
- **Dark Text Secondary:** `#A8A8A8`
- **Dark CTA Button:** `#F5F5F5` (文本为 `#111111`)

---

## 3. Typography Rules (字体排版规范)

### Font Families
- **Sans-Serif (默认主字体):**  
  `"Inter", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", system-ui, sans-serif`  
  *说明：* 现代整洁，中西文无缝混排，字符辨识度高。
- **Monospace (金额、数字、代码类字段):**  
  `"IBM Plex Mono", "SF Mono", ui-monospace, monospace`  
  *说明：* 所有价格数值（如 `HK$0.00`, `US$13.22/年`）、试用到期日期、订单号使用等宽字体，专业精密。

### Hierarchy & Scale (排版层级与规格)
| 层级 | 规格尺寸 | 字重 | 字符间距 (Tracking) | 适用场景 |
| :--- | :--- | :--- | :--- | :--- |
| **Eyebrow / Kicker** | `11px` | `500` (Medium) | `+0.16em` (宽字距大写/微标) | 步骤指示（`您的信息 > 支付`）、品类标签 |
| **H1 / Product Name** | `24px`–`28px` | `500` (Medium) | `-0.03em` | 收银台主产品名（`InkPai Plus`） |
| **Total Price** | `28px`–`32px` | `500`–`600` (Mono) | `-0.02em` | 今日应付金额、总计价格 |
| **H2 / Section Title** | `18px`–`20px` | `500` (Medium) | `-0.02em` | 表单分区标题、订单明细栏头 |
| **Body / Labels** | `14px` | `400` / `500` | `normal` | 输入框 Label、权益项目列表 |
| **Form Inputs** | `14px`–`15px` | `400` (Regular) | `normal` | 邮箱输入框、国家选择下拉框 |
| **Metadata / Legal** | `11px`–`12px` | `400` (Regular) | `normal` | 经销商声明、MoR 备注、条款政策链接 |

---

## 4. Component Stylings (组件外观与状态定义)

### 1. 收银台主容器 (Checkout Modal / Card)
- **背景：** `#FFFFFF` 或 浅双分栏（左侧摘要卡片 `#FFFFFF` / 全局背景 `#F5F5F0`）。
- **圆角：** 大圆角设计（`24px` / `1.5rem`），与 Meyracle 卡片保持绝对一致。
- **边框：** `1px solid #E5E5E5`。
- **投影：** 极淡漫反射 `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06)`。

### 2. 操作按钮 (Action Buttons)
- **主支付按钮 (Primary Action):**
  - **形状：** 胶囊全圆角（`rounded-full` / `9999px`）或大圆角（`16px`），高度 `48px`。
  - **配色：** 背景 `#111111`，文字 `#FFFFFF`，字号 `14px` / `15px`，字重 `500`。
  - **交互：** Hover 时 `opacity: 0.88`；Active（点击）时微缩放 `scale(0.99)`；聚焦时显示清晰轮廓线。
- **次级 / 返回按钮 (Secondary Action):**
  - **形状：** `rounded-full`，高度 `40px`。
  - **配色：** 背景透明或 `#FFFFFF`，边框 `1px solid #E5E5E5`，文字 `#111111`，Hover 时边框变深为 `#111111`。

### 3. 表单输入框与下拉选择 (Inputs & Selects)
- **高度与填充：** 高度 `44px`–`48px`，内部横向边距 `14px`。
- **圆角：** 平滑中圆角（`12px`–`14px`）或微圆角。
- **描边与底色：** 背景色 `#FFFFFF`，描边 `1px solid #E5E5E5`。
- **占位符颜色：** `#8A8A8A`。
- **聚焦状态 (Focus):** 边框加深至 `#111111`，无彩色外发光，保持克制整洁。
- **标签位置 (Label):** 位于输入框正上方，字号 `13px`–`14px`，颜色 `#111111`，字重 `500`。

### 4. 权益清单 (Feature List / Checklist)
- **对勾图标：** 采用简约纤细的黑勾或沉稳墨绿小对勾（`✓` 或 SVG，颜色 `#111111` 或 `#2F6F4E`）。
- **文字样式：** `13px`–`14px`，颜色 `#5C5C5C`，行距 `1.6`。
- **间距：** 每项垂直间距 `8px`–`10px`。

### 5. 计费账单明细栏 (Order Summary Table)
- **条目排布：** 左右两端对齐（Flex `justify-between`）。
- **试用与后续周期：**
  - 试用期提示：`7 天试用` 对应 `HK$0.00`（或当前币种），次级行 `试用结束后` 对应 `117.67 港元/年 (下次扣款: 9月25日)`。
  - 今日应付：字号加大至 `16px`–`18px`，字重加粗，使用等宽数字清晰呈现。

### 6. 商户与法律说明条 (Merchant of Record / Waffo / Pancake Notice)
- **排布位置：** 放置于表单主按钮下方，居中或左对齐。
- **字体规格：** `11px`–`12px`，文字颜色 `#8A8A8A`。
- **链接样式：** 条款、隐私等法律链接采用下划线或 `#5C5C5C`，Hover 时加深为 `#111111`。

---

## 5. Layout & Responsive Principles (布局与响应式原则)

### Desktop 桌面布局 (>= 768px)
- **网格结构：** 双栏分屏（Split Column Layout）。
  - **左栏 (约 45%–50%)：** 产品宣传卡片、墨排 Inkpai 品牌封面横幅图、包含的 Plus 权益列表、试用与年费说明。
  - **右栏 (约 50%–55%)：** 步骤引导（如 `您的信息 > 支付`）、联系邮箱、结算国家/币种选择、支付方式（信用卡/移动支付/等）、主支付按钮与安全认证徽标。
- **最大宽度：** 结账主视窗最大宽度限定为 `880px`–`960px`，居中显示于屏幕中央。

### Mobile 移动端布局 (< 768px)
- **单栏流式排列 (Strict Single Column Stack):**
  - 顶部简要折叠卡片：显示产品名、缩略图与总价（支持点击展开详细权益明细）；
  - 中部主力区域：立即呈现邮箱、国家及支付信息输入；
  - 底部操作栏：全宽（Full-width）主支付按钮，高 `48px`–`52px`，保障触控舒适；
  - 底部安全与合规声明，绝不产生横向滚动溢出。

---

## 6. Anti-Patterns & Banned Styles (明确禁止的负面清单)

在生成或配置 Inkpai 收银台时，严格**杜绝**以下设计：
- ❌ **禁止使用高饱和彩色渐变或 AI 紫蓝发光：** 不得出现紫色渐变、霓虹外发光按键。
- ❌ **禁止使用纯黑死色 (`#000000`)：** 一律使用炭墨色 `#111111` 或 `#1E1E1E`。
- ❌ **禁止喧闹的倒计时焦虑弹窗：** 严禁出现「仅剩最后 5 分钟优惠！」等虚假焦虑设计。
- ❌ **禁止厚重的拟物阴影：** 只允许使用柔和弥散的极浅灰投影（Alpha 不超过 0.06）。
- ❌ **禁止与 Meyracle 冷暖色混杂：** 全局保持象牙米灰（`#F5F5F0`）与炭墨黑（`#111111`）的主视觉纯正。
