# AdSense 提交前修复记录

检查日期：2026-11-13。本次只修改本地仓库，未提交 git commit、未发布到线上、未提交 AdSense。

## 英文页面

共 20 个英文 URL（包含原有 2 个法律页）；原有 7 个中文 URL 保留，不新增中文镜像。新增页面在 `/zh/` 前缀下返回 308 至英文，canonical / hreflang 与 sitemap 只列英文。

| URL                             | 本次状态                                |
| ------------------------------- | --------------------------------------- |
| `/`                             | 已有页面，清理图片或修正内容 / 共享导航 |
| `/watch`                        | 已有页面，清理图片或修正内容 / 共享导航 |
| `/story`                        | 已有页面，清理图片或修正内容 / 共享导航 |
| `/characters`                   | 已有页面，清理图片或修正内容 / 共享导航 |
| `/news`                         | 已有页面，清理图片或修正内容 / 共享导航 |
| `/about`                        | 新增英文独立页                          |
| `/contact`                      | 新增英文独立页                          |
| `/episodes`                     | 新增英文独立页                          |
| `/staff`                        | 新增英文独立页                          |
| `/manga-vs-anime`               | 新增英文独立页                          |
| `/where-to-watch`               | 新增英文独立页                          |
| `/schedule`                     | 新增英文独立页                          |
| `/characters/satoko-kirigaya`   | 新增英文独立页                          |
| `/characters/shinpei-goto`      | 新增英文独立页                          |
| `/characters/kotaro-ogawa`      | 新增英文独立页                          |
| `/characters/mitsueda`          | 新增英文独立页                          |
| `/characters/mitsuharu-okumura` | 新增英文独立页                          |
| `/characters/jubei-kirigaya`    | 新增英文独立页                          |
| `/privacy-policy`               | 已有页面，清理图片或修正内容 / 共享导航 |
| `/terms-of-service`             | 已有页面，清理图片或修正内容 / 共享导航 |

## 主要来源与明确的信息缺口

- [官方角色页](https://hotaru-anime.com/character/)：人物定位与日语声优。Satoko、Shinpei 首次登场依据[第1集官方简介](https://hotaru-anime.com/episodes/?ep=1)。其余角色未核实首次登场集数，保留 `not announced yet`。
- [Aniplex 官方发行页](https://www.aniplex.co.jp/hotaru-anime/)：两盒计划收录 1–6、7–12 集，作为 12 集发行计划依据；不据此猜后续播出日期。
- [官方分集目录](https://hotaru-anime.com/episodes/)：已发布 1–6 集标题与简介；英文简介为本站改写，英文标题为阅读提示而非官方译名。
- [官方播出页](https://hotaru-anime.com/onair/)和[富士电视台节目页](https://www.fujitv.co.jp/b_hp/hotaru-anime/)：固定播出档、首播日期与第6集具体日期；未取得逐集依据的其他日期标注为未核实，不按周加七天。
- [官方制作名单](https://hotaru-anime.com/#castStaff)及[制作公司公告](https://davidproduction.jp/news/detail/?id=13)：制作人员及声优资料。
- [官方漫画目录](https://hotaru-anime.com/comics/)、[VIZ英文目录](https://www.viz.com/firefly-wedding)及[VIZ第8卷](https://www.viz.com/manga-books/manga/firefly-wedding-volume-8-0/product/9040)：日文卷目、英文发行记录。未核实动画改编章节范围，不给“从某章接读”的事实承诺。
- Crunchyroll 仅链接其[官方公告视频](https://www.youtube.com/watch?v=kLfQNqd_NA0)及平台站内搜索；没有嵌入播放器，没有把搜索结果当作国家授权或字幕清单。未核实地区、字幕、收费字段明确标注。
- Mitsuharu Okumura 页面为透明的核实状态页；没有从已查官方动画资料确认其角色、声优和首登场，因此撤下旧版无出处身份描述。页面不声称角色不存在。

## 联系与版权

About 使用指定 title 与完整英文版权声明，说明独立维护者及逐条查来源的方式。Contact 列明 support@fireflywedding.org、两个工作日的目标回复时效，并明确权利方可要求更正或删除。

完整图片路径、来源 / 未知状态与处理结果见 [版权清单](copyright-image-audit.md)；原始哈希及引用见 [结构化清单](image-inventory.json)。公开粉丝文章无官方立绘、漫画分镜、动画帧、带字幕画面，也没有观看或漫画内容的嵌入或转存。

## 验证

- `pnpm build`：通过。
- `pnpm exec tsc --noEmit`：通过。
- 本地生产服务器：20 个英文 URL 均返回 200，每页一个 H1，公共图片仅为本站文字标志，无 iframe。
- Sitemap：27 个 URL = 20 英文 + 原有 7 中文；新英文页面没有 `/zh/` loc 或 hreflang。
- `/zh/about`、`/zh/episodes`、`/zh/characters/satoko-kirigaya`：308 至英文 URL。
- 已删除图片抽查：动画海报、角色肖像、装饰图 URL 返回 404。
- 浏览器检查：桌面主页、About、角色页及手机分集页正常；手机表格在自身区域横向滚动，页面无横向溢出；手机导航含 About / Contact。
- Prettier 和 `git diff --check`：通过。

## 发布边界

本地修复不会自动更改线上旧构建、CDN 缓存或独立对象存储。部署后需复查旧图片 URL 已返回 404，并核对线上 sitemap 与英文页面数量。线上当前页面的只读图片引用记录另见 [线上扫描](live-image-references-before.json)。生产数据库没有直接查询或修改。
