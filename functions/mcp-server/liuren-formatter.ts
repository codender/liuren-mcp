interface LiurenArgs {
  birthDate: Date;
  gender: 0 | 1;
}

export function formatLiurenMarkdown(
  birthDate: Date,
  gender: 0 | 1,
  result: any,
  nianMing: any
): string {
  let markdown = "# 大六壬排盘结果\n\n";

  // 基本信息
  markdown += "## 基本信息\n\n";
  markdown += "| 项目 | 内容 |\n";
  markdown += "|------|------|\n";
  markdown += `| **出生日期** | ${birthDate.toLocaleDateString("zh-CN")} |\n`;
  markdown += `| **出生时辰** | ${birthDate.toLocaleTimeString("zh-CN")} |\n`;
  markdown += `| **性别** | ${gender === 1 ? "男" : "女"} |\n`;
  if (nianMing?.year) {
    markdown += `| **年命** | ${nianMing.year} |\n`;
  }
  markdown += `| **八字** | ${result.dateInfo.bazi} |\n`;
  markdown += "|:---|:---|---:|\n";
  markdown += `| **时空** | ${result.dateInfo.kong.join(" ")} |\n`;
  markdown += `| **月将** | ${result.dateInfo.yuejiang} |\n`;
  markdown += `| **旬** | ${result.dateInfo.xun} |\n`;
  markdown += `| **驿马** | ${result.dateInfo.yima} |\n`;
  if (result.dateInfo.dingma && result.dateInfo.dingma !== "--") {
    markdown += `| **丁马** | ${result.dateInfo.dingma} |\n`;
  }
  if (result.dateInfo.tianma && result.dateInfo.tianma !== "--") {
    markdown += `| **天马** | ${result.dateInfo.tianma} |\n`;
  }
  markdown += "\n";

  // 天地盘
  markdown += "## 天地盘\n\n";
  markdown += "| 位置 | 地盘 | 天盘 | 天将 |\n";
  markdown += "|------|------|------|------|\n";
  const zhiNames = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  for (let i = 0; i < 12; i++) {
    const dipan = result.tiandipan["地盘"][i.toString()];
    const tianpan = result.tiandipan["天盘"][i.toString()];
    const tianjiang = result.tiandipan["天将"][i.toString()];
    markdown += `| ${zhiNames[i]} | ${dipan} | ${tianpan} | ${tianjiang} |\n`;
  }
  markdown += "\n";

  // 四课
  markdown += "## 四课\n\n";
  markdown += "| 课名 | 内容 | 天将 |\n";
  markdown += "|------|------|------|\n";
  markdown += `| 一课 | ${result.siKe["一课"][0]} | ${result.siKe["一课"][1]} |\n`;
  markdown += `| 二课 | ${result.siKe["二课"][0]} | ${result.siKe["二课"][1]} |\n`;
  markdown += `| 三课 | ${result.siKe["三课"][0]} | ${result.siKe["三课"][1]} |\n`;
  markdown += `| 四课 | ${result.siKe["四课"][0]} | ${result.siKe["四课"][1]} |\n`;
  markdown += "\n";

  // 三传
  markdown += "## 三传\n\n";
  markdown += "| 传名 | 地支 | 天将 | 六亲 | 遁干 |\n";
  markdown += "|------|------|------|------|------|\n";
  markdown += `| 初传 | ${result.sanChuan["初传"][0]} | ${result.sanChuan["初传"][1]} | ${result.sanChuan["初传"][2]} | ${result.sanChuan["初传"][3]} |\n`;
  markdown += `| 中传 | ${result.sanChuan["中传"][0]} | ${result.sanChuan["中传"][1]} | ${result.sanChuan["中传"][2]} | ${result.sanChuan["中传"][3]} |\n`;
  markdown += `| 末传 | ${result.sanChuan["末传"][0]} | ${result.sanChuan["末传"][1]} | ${result.sanChuan["末传"][2]} | ${result.sanChuan["末传"][3]} |\n`;
  markdown += "\n";
  markdown += `**课体**: ${result.sanChuan["课体"]}\n\n`;

  // 遁干
  markdown += "## 遁干\n\n";
  markdown += "| 地支 | 遁干 |\n";
  markdown += "|------|------|\n";
  const dizhi = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
  dizhi.forEach((zhi) => {
    markdown += `| ${zhi} | ${result.dunGan[zhi] || " "} |\n`;
  });
  markdown += "\n";

  // 神煞
  markdown += "## 神煞\n\n";
  const shenShaItems = [];
  if (result.shenSha.riDe) shenShaItems.push({ name: "日德", value: result.shenSha.riDe });
  if (result.shenSha.riLu) shenShaItems.push({ name: "日禄", value: result.shenSha.riLu });
  if (result.shenSha.shengQi) shenShaItems.push({ name: "生气", value: result.shenSha.shengQi });
  if (result.shenSha.siQi) shenShaItems.push({ name: "死气", value: result.shenSha.siQi });
  if (result.shenSha.poSui) shenShaItems.push({ name: "破碎", value: result.shenSha.poSui });
  if (result.shenSha.sangMen) shenShaItems.push({ name: "丧门", value: result.shenSha.sangMen });
  if (result.shenSha.diaoKe) shenShaItems.push({ name: "吊客", value: result.shenSha.diaoKe });

  if (shenShaItems.length > 0) {
    markdown += "| 神煞 | 内容 |\n";
    markdown += "|------|------|\n";
    shenShaItems.forEach((item) => {
      markdown += `| **${item.name}** | ${item.value} |\n`;
    });
    markdown += "\n";
  }

  // 年命信息
  if (nianMing?.year || nianMing?.gender || nianMing?.luNian) {
    markdown += "## 年命信息\n\n";
    markdown += "| 项目 | 内容 |\n";
    markdown += "|------|------|\n";
    if (nianMing.year) markdown += `| **年命** | ${nianMing.year} |\n`;
    if (nianMing.gender) markdown += `| **性别** | ${nianMing.gender} |\n`;
    if (nianMing.luNian) markdown += `| **流年** | ${nianMing.luNian} |\n`;
    markdown += "\n";
  }

  return markdown;
}
