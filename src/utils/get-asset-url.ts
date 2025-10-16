// ----------------------------------------------------------------------

/**
 * 获取静态资源的完整 URL
 * 自动处理 publicPath/base 路径前缀
 * 
 * @param path - 资源路径，例如: 'assets/logo.png' 或 '/assets/logo.png'
 * @returns 完整的资源 URL，例如: '/teach/assets/logo.png'
 */
export function getAssetUrl(path: string): string {
  const baseUrl = import.meta.env.BASE_URL;
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;
  return `${baseUrl}${normalizedPath}`;
}

