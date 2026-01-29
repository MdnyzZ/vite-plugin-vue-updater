import { ElMessageBox, ElNotification } from 'element-plus';
import { AutoUpdater, UpdaterOptions } from './core';

export interface UIConfig {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  notificationTitle?: string;
  notificationDescription?: string;
}

export interface UseUpdaterOptions extends UpdaterOptions {
  ui?: UIConfig;
  onRefresh?: () => void;
}

/**
 * 核心 Hook
 * @param options 配置项
 * @returns AutoUpdater 实例
 */
export function useVersionCheck(options: UseUpdaterOptions = {}) {
  // SSR 或非浏览器环境直接返回
  if (typeof window === 'undefined') return;

  const updater = new AutoUpdater(options);
  let hasNotified = false;

  // 默认文案
  const text = {
    title: options.ui?.title || '系统更新提示',
    description: options.ui?.description || '检测到系统有新版本发布，为保证功能正常使用，请立即刷新页面。',
    confirmText: options.ui?.confirmText || '立即刷新',
    cancelText: options.ui?.cancelText || '稍后',
    notTitle: options.ui?.notificationTitle || '更新就绪',
    notDesc: options.ui?.notificationDescription || '新版本已准备好，点击此处刷新。',
  };

  const performRefresh = () => {
    if (options.onRefresh) {
      options.onRefresh();
    } else {
      window.location.reload();
    }
  };

  // 显示常驻通知（弱提醒）
  const showPersistentNotification = () => {
    ElNotification({
      title: text.notTitle,
      message: text.notDesc,
      type: 'primary',
      position: 'bottom-right',
      duration: 0,      // 0 = 永久不关闭
      showClose: false, // 隐藏关闭按钮，强制只能点刷新
      offset: 50,
      onClick: performRefresh
    });
  };

  // 显示弹窗（强提醒）
  const showUpdateModal = () => {
    ElMessageBox.confirm(text.description, text.title, {
      confirmButtonText: text.confirmText,
      cancelButtonText: text.cancelText,
      type: 'warning',
      closeOnClickModal: false,
      closeOnPressEscape: false,
      distinguishCancelAndClose: true,
    })
      .then(() => {
        performRefresh();
      })
      .catch(() => {
        // 用户点击取消或关闭 -> 降级为弱提醒
        showPersistentNotification();
      });
  };

  updater.onUpdate(() => {
    if (hasNotified) return;
    hasNotified = true;
    showUpdateModal();
  });

  return updater;
}