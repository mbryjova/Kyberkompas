Jak spustit program přes klient Expo Go na vlastním zařízení Android:

1. Zkontrolujete, že máte Node.js, případně stáhněte zde: https://nodejs.org/en/ LTS
2. nainstalujte expo-cli příkazem: npm install -g expo-cli
3. spusťte v terminálu příkaz v adresáři projektu: expo start --tunnel

Kvůli adrese kde běží server je potřeba na mobilu i počítači mít zapnutou VPN FI MU
VPN: https://www.fi.muni.cz/tech/unix/vpn.html.cs

4. stáhněte si aplikaci expo go a v aplikaci naskenujte QR kód z terminálu po spuštění příkazu v bodě 3.
5. Aplikace by měla běžet - ujistěte se že máte telefon i počítač připojený ve stejné síti,
   pro vstup do aplikace se zaregistrujte

Jak spustit testovací server (není v aktuálním stavu potřeba pro správný běh aplikace):

1. běžte v terminálu do adresáře Kyberkompas
2. máte-li nainstalovaný node.js nainstalujte json-server příkazem: npm i json-server
3. server spustíte příkazem: json-server --watch db.json
