Jak spustit program přes klient Expo Go na vlastním zařízení Android:

1. Zkontrolujete, že máte Node.js, případně stáhněte zde: https://nodejs.org/en/ LTS
2. nainstalujte expo-cli příkazem: `npm install -g expo-cli`
3. spusťte příkaz v adresáři projektu: `npm install`
4. spusťte v terminálu příkaz v adresáři projektu: `expo start --tunnel`

Kvůli adrese kde běží server je potřeba na mobilu i počítači mít zapnutou VPN FI MU (nebo být v síti FI)
VPN: https://www.fi.muni.cz/tech/unix/vpn.html.cs

5. stáhněte si aplikaci Expo Go (v Google Play) a v aplikaci naskenujte QR kód z terminálu po spuštění příkazu v bodě 4.
6. Aplikace by měla běžet - ujistěte se že máte telefon i počítač připojený ve stejné síti,
   pro vstup do aplikace se zaregistrujte (email není povinný)

Jak spustit testovací server (není v aktuálním stavu potřeba pro správný běh aplikace):

1. běžte v terminálu do adresáře Kyberkompas
2. máte-li nainstalovaný node.js nainstalujte json-server příkazem: `npm i -g json-server`
3. server spustíte příkazem: `json-server --watch db.json`
