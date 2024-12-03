export async function register() {
    console.log("Sending 'ready' event...");
    // Emit ready event for PM2
    if (process.send) process.send("ready");
}
