import Taro from '@tarojs/taro'
import GlobalDataManager from '@/manager/GlobalDataManager';
import StorageManager from '@/manager/StorageManager';
import webApi from '@/api/webApi';

const m_managerGlobalData = GlobalDataManager.getInstance();
const m_managerStorage = StorageManager.getInstance();

export default class AppInitDataService {
  // 单例对象
  static _instance: AppInitDataService;

  constructor() { }

  static getInstance() {
    if (!this._instance) {
      this._instance = new AppInitDataService();
    }
    return this._instance;
  }

  initSystemInfo () {
    // 获取系统信息
    Taro.getSystemInfo({
      success: (res) => {
        console.log('AppInitDataService getSystemInfo', res);
        m_managerGlobalData.objSystemInfo = res;
      },
      fail: (err) => {
        console.error('AppInitDataService getSystemInfo', err);
        m_managerGlobalData.objSystemInfo = err;
      }
    });
  }

  initAppInfo () {
    // 设置小程序全局配置字段
    m_managerGlobalData.objAppInfo.strPathMain = '/pages/Main/index';
  }

  initCloudInfo () {
    // 获取用户信息
    m_managerStorage.setStorageSync('memberInfo', {
      aaa: '1111',
      bbb: 222
    });
    // 接口获取信息
    // const paramsTest = {};
    // webApi.queryTestData(paramsTest).then((res) => {
    //   console.log('queryTestData', res);
    // }).catch((err) => {
    //   console.error('queryTestData', err);
    // });
  }

  init() {
    console.log('AppInitDataService init');
    this.initSystemInfo();
    this.initAppInfo();
    this.initCloudInfo();
  }
}