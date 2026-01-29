import axios from "axios";

export interface VersionData {
  version: number | string;
  timestamp?: number;
  [key: string]: any;
}

export interface UpdaterOptions {
  timer?: number; // 轮询时间 ms
  jsonUrl?: string; // version.json 地址
}

export class AutoUpdater {
  private oldVersion: string | number | null = null;
  private timer: any = null;
  private interval: number;
  private jsonUrl: string;
  private onUpdateCallback: ((data: VersionData) => void) | null = null;
  private isChecking = false;

  constructor(options: UpdaterOptions = {}) {
    this.interval = options.timer || 60 * 1000;
    this.jsonUrl = options.jsonUrl || "/version.json";
    this.init();
  }

  private async init() {
    try {
      const data = await this.fetchVersion();
      this.oldVersion = data.version;
      this.startPolling();
    } catch (e) {
      console.warn("[Updater] Init failed (dev env?):", e);
    }
  }

  private async fetchVersion(): Promise<VersionData> {
    const { data } = await axios.get<VersionData>(
      `${this.jsonUrl}?t=${Date.now()}`,
    );
    return data;
  }

  private async checkUpdate() {
    if (this.isChecking) return;
    this.isChecking = true;

    try {
      const newVersionData = await this.fetchVersion();
      if (this.oldVersion && newVersionData.version !== this.oldVersion) {
        this.stopPolling(); // 发现更新即停止，防止重复打扰
        if (this.onUpdateCallback) {
          this.onUpdateCallback(newVersionData);
        }
      }
    } catch (error) {
      // ignore network errors
    } finally {
      this.isChecking = false;
    }
  }

  private visibilityHandler = () => {
    if (document.visibilityState === "visible") {
      this.checkUpdate();
    }
  };

  private startPolling() {
    this.stopPolling();
    this.timer = setInterval(this.visibilityHandler, this.interval);
    document.addEventListener("visibilitychange", this.visibilityHandler);
  }

  public stopPolling() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public destroy() {
    this.stopPolling();
    document.removeEventListener("visibilitychange", this.visibilityHandler);
  }

  public onUpdate(fn: (data: VersionData) => void) {
    this.onUpdateCallback = fn;
  }
}
