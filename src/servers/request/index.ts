import { message } from 'ant-design-vue';
import { getLocalInfo, removeLocalInfo } from '@/utils/local';
import { TOKEN } from '@/utils/config';
import { router } from '@/router';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import AxiosRequest from './request';

// 生成环境所用的接口
const prefixUrl = import.meta.env.VITE_BASE_URL as string;
const baseURL = process.env.NODE_ENV !== 'development' ? prefixUrl : '/api';

// 请求配置
export const request = creteRequest(baseURL);

/**
 * 创建请求
 * @param url - 链接地址
 */
function creteRequest(url: string) {
  return new AxiosRequest({
    baseURL: url,
    timeout: 180 * 1000,
    interceptors: {
      // 接口请求拦截
      requestInterceptors(res) {
        const token = getLocalInfo(TOKEN) || '';
        if (res?.headers && token) {
          res.headers.Authorization = `${token}`;
        }
        return res;
      },
      // 请求拦截超时
      requestInterceptorsCatch(err) {
        message.error('请求超时！');
        return err;
      },
      // 接口响应拦截
      responseInterceptors(res) {
        const { data } = res;
        // 权限不足
        if (data?.code === 401 && !location.href?.includes('/login?state=401')) {
          removeLocalInfo(TOKEN);
          const { setPermissions } = useUserStore();
          setPermissions([]);
          router.push('/login?state=401');
          handleError(data?.message || '权限不足，请重新登录！');
          return res;
        }
    
        // 错误处理
        if (data?.code !== 200) {
          handleError(data?.message);
          return res;
        }
    
        return res;
      },
      responseInterceptorsCatch(err) {
        // 权限不足
        if ((err?.response?.status === 401 || err.response?.data?.code === 401) && !location.href?.includes('/login')) {
          removeLocalInfo(TOKEN);
          const { setPermissions } = useUserStore();
          setPermissions([]);
          router.push('/login?state=401');
          handleError(err.response?.data?.message || '权限不足，请重新登录！');
          return err;
        }

        // 取消重复请求则不报错
        if(axios.isCancel(err)) {
          err.data = err.data || {};
          return err;
        }

        handleError('服务器错误！');
        return err;
      }
    }
  });
}

/**
 * 异常处理
 * @param error - 错误信息
 * @param content - 自定义内容
 */
const handleError = (error: string, content?: string) => {
  console.error('错误信息:', error);
  message.error({
    content: content || error || '服务器错误',
    key: 'error'
  });
};

/**
 * 取消请求
 * @param url - 链接
 */
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};

/** 取消全部请求 */
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};
