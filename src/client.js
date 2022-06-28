export function run() {
    new Worker(new URL('./worker', import.meta.url))
}