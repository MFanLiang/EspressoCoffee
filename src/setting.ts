// 项目的 logo ｜ 标题 的全局配置
interface settingConfigType {
  /** 系统logo位的标题 */
  title: string;

  /** logo 图片路径地址 */
  logoImg: string;

  /** logo是否隐藏 */
  logoHidden: boolean;

  /** 标签栏文案 */
  labelTitle: string;

  /** 底部网页版权文案 */
  footerCopyright: string;

  /** 左侧导航菜单的背景颜色 */
  backGroundColor: string;
}

const settingsConfig: settingConfigType = {
  title: '咖啡技术平台',
  logoImg: './logo.jpg',
  logoHidden: true,
  labelTitle: '咖啡',
  footerCopyright: '©️ 咖啡专属技术平台',
  backGroundColor: '#2264d6'
};

export default settingsConfig;
