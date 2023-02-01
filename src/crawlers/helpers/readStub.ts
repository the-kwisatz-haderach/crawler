export default function getStubPath(name: string): string {
  return `file://${process.cwd()}/crawlers/__stubs__/${name}.html`
}
