export default function(timestamp: string) {
    return new Date(timestamp).toLocaleDateString()
}