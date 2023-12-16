export interface PropsType {
  /** 场景类型 */
  useType: 'add' | 'edit';
  /** 对话框是否开启 */
  visible: boolean;
  /** 对话框标题 */
  title: string;
  /** 对话框宽度 */
  width: string;
  /** 对话框确认按钮文本 */
  successBtnText: string;
  /** 对话框关闭按钮文本 */
  closeBtnText: string;
  /** 对话框是否可以拖拽移动 */
  isDraggable: boolean;
  /** 是否全屏展示对话框 */
  fullscreen: boolean;
}
