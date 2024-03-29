//Online Status
function registerOnlineStatusChanges() {
    window.addEventListener('load', () => setOnlineStatus(navigator.onLine));
    window.addEventListener('online', () => setOnlineStatus(navigator.onLine));
    window.addEventListener('offline', () => setOnlineStatus(navigator.onLine));
}

function setOnlineStatus(isOnline) {
    const label = document.getElementById("online-status");

    isOnline
        ? label.innerText = "Online"
        : label.innerText = "Offline";
}

registerOnlineStatusChanges();

//Counter
function increaseCount() {
    count++;
    handleCountChange(count);
}

function decreaseCount() {
    count--;
    handleCountChange(count);
}

function handleCountChange(count) {
    localStorage.setItem(countStorageId, count);
    countElement.innerText = count;
}

const countStorageId = "count";
var count = localStorage.getItem(countStorageId) ?? 0;
const countElement = document.getElementById("count");
handleCountChange(count);

//Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("./sw.js");
    });
}

//Notification
async function notify() {
    if (!("Notification" in window)) {
        alert("Notifications not supported");
        return;
    }

    if (Notification.permission !== "granted") {
        await Notification.requestPermission();
    }

    const serviceWorker = await navigator.serviceWorker.ready;

    serviceWorker.showNotification("Current count: " + count);
}
