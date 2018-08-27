if (p !== null &&
    (typeof p === 'object' || typeof === 'function') &&
    typeof p.then === 'function') {
    // 假设为thenable
} else {
    // 不是thenable
}