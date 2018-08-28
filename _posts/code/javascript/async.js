if (p !== null &&
    (typeof p === 'object' || typeof p === 'function') &&
    typeof p.then === 'function') {
    // 假设为thenable
} else {
    // 不是thenable
}