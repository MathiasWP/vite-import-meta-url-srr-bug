export function run() {
    const worker = new Worker(new URL('./worker', import.meta.url))
    worker.addEventListener('message', console.log)
    worker.postMessage('hello')
}