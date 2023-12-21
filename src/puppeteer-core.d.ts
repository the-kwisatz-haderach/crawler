declare module 'puppeteer-core' {
  const puppeteer = {
    launch(...args: any[]): any
  }
  export default puppeteer
  export type ElementHandle<T = any> = {
    evaluate: any
    click: any
    $(...args: any[]): Promise<any>
    $$(...args: any[]): Promise<any[]>
  }
  export type Page = any
}
