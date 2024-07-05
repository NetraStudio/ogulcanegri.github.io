// Lanyard API'den son veriyi saklamak için değişken tanımlayalım
let lastData = null;

// Lanyard API'den veri alma fonksiyonu
function fetchData() {
    return fetch("https://api.lanyard.rest/v1/users/1213396953476497439")
        .then((response) => response.json())
        .then((data) => {
            // Eğer son veri ile gelen veri aynı değilse güncelle
            if (!lastData || JSON.stringify(lastData) !== JSON.stringify(data)) {
                lastData = data;
                updateDiscordAndSpotifyInfo(data);
            }
        })
        .catch((error) => {
            console.error("API sorgusu başarısız oldu:", error);
        });
}

// Discord ve Spotify bilgilerini güncelleyen fonksiyon
function updateDiscordAndSpotifyInfo(data) {
    var text = document.querySelector(".text");
    var username = data["data"]["discord_user"]["username"];
    text.innerHTML = username;

    var avatar = document.querySelector(".avatar");
    var imageUrl = data["data"]["discord_user"]["avatar"];
    avatar.src = `https://cdn.discordapp.com/avatars/${data["data"]["discord_user"]["id"]}/${imageUrl}.png`;

    var active_on_desktop = data["data"]["active_on_discord_desktop"];
    var active_on_mobile = data["data"]["active_on_discord_mobile"];
    var active_on_web = data["data"]["active_on_discord_web"];
    var circle = document.querySelector(".circle");

    if (active_on_desktop || active_on_mobile || active_on_web) {
        circle.style.backgroundColor = "green";
    } else {
        circle.style.backgroundColor = "gray";
    }

    // Spotify bilgilerini güncelle
    var spotifyData = data["data"]["spotify"];
    var spotifyText = document.querySelector(".spotify-text");
    var navbarText = document.querySelector(".navbar-text");

    if (spotifyData) {
        var song = spotifyData["song"];
        var artist = spotifyData["artist"];
        spotifyText.innerHTML = `Şu anda dinleniyor: ${song} - ${artist}`;
        navbarText.innerHTML = `Şu anda dinleniyor: ${song} - ${artist}`;
    } else {
        spotifyText.innerHTML = "Şu anda bir şey dinlenmiyor.";
        navbarText.innerHTML = "Not playing anything";
    }
}

// Sayfa yüklendiğinde ilk kez veriyi alalım
fetchData();

// Her 10 saniyede bir veriyi kontrol edelim
setInterval(fetchData, 10000); // 10 saniyede bir kontrol et
