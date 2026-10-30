# Trainingscoach als echte iPhone-App – ohne Mac

Die App wird mit **Capacitor** als native iOS-App verpackt. Sie hat ein eigenes Icon und Startbild und läuft offline.
Gebaut wird sie kostenlos auf einem **Mac in der Cloud (GitHub Actions)**.
Mit **Sideloadly** und deiner normalen Apple-ID kommt sie vom Windows-PC aufs iPhone.

```
Dieser Ordner ──► GitHub ──► Cloud-Mac baut .ipa ──► Sideloadly (Windows) ──► iPhone
```

---

## Einmalige Einrichtung

### 1. Projekt zu GitHub hochladen
1. Konto anlegen auf <https://github.com> (falls noch keins).
2. Oben rechts **+ → New repository**, Name z. B. `schlafcoach-app`.
   **Private** geht. (Hinweis: Private Repos haben ca. 200 Mac-Build-Minuten/Monat gratis, ein Build braucht ~5–10 Min. **Public** ist unbegrenzt.)
   Häkchen bei „Add a README“ **nicht** setzen → **Create repository**.
3. Auf der leeren Repo-Seite auf **„uploading an existing file“** klicken.
4. Im Explorer `C:\Sami\schlafcoach-app` öffnen, **alles darin markieren** (Strg+A) und ins Browserfenster ziehen.
   Wichtig: Der Ordner **`.github`** muss mit dabei sein, denn er enthält das Bauskript.
5. Unten **Commit changes** klicken.

### 2. App in der Cloud bauen lassen
1. Im Repo oben auf den Tab **Actions** gehen. Der Build „iOS-App bauen“ startet automatisch.
   (Falls nicht: links „iOS-App bauen“ → **Run workflow**.)
2. Warten, bis er grün ✅ ist (~5–10 Min.).
3. Den Lauf anklicken und unten bei **Artifacts** die Datei **Trainingscoach-ipa** herunterladen.
4. Das ZIP entpacken. Darin liegt **`Trainingscoach.ipa`**.

### 3. Windows vorbereiten (einmalig)
1. **iTunes** und **iCloud** direkt von Apple installieren, **nicht aus dem Microsoft Store**:
   - <https://www.apple.com/de/itunes/> → „Windows-Version herunterladen“ (ggf. unten „Andere Versionen“)
   - iCloud für Windows: <https://support.apple.com/de-de/HT204283>
2. **Sideloadly** installieren: <https://sideloadly.io>

### 4. Aufs iPhone installieren
1. iPhone per **USB-Kabel** anschließen, entsperren, „Diesem Computer vertrauen“ bestätigen.
2. Sideloadly öffnen. Das iPhone wird oben erkannt.
3. `Trainingscoach.ipa` in das Sideloadly-Fenster ziehen.
4. Bei **Apple ID** deine Apple-ID eintragen → **Start** → Passwort (und ggf. 2FA-Code) eingeben.
5. Auf dem iPhone:
   - **Einstellungen → Datenschutz & Sicherheit → Entwicklermodus** einschalten, Neustart bestätigen (nur einmal nötig).
   - **Einstellungen → Allgemein → VPN & Geräteverwaltung** → deine Apple-ID antippen → **Vertrauen**.
6. Fertig. **Trainingscoach** liegt jetzt als App auf dem Homescreen. 🎉

---

## Wichtig zu wissen

| Thema | Was gilt |
|---|---|
| **7-Tage-Limit** | Mit kostenloser Apple-ID läuft die Signatur nach 7 Tagen ab. Danach startet die App nicht mehr, **die Daten bleiben aber erhalten**. Lösung: dieselbe `.ipa` einfach nochmal per Sideloadly installieren. Sideloadly kann das unter *Advanced Options → Automatic refresh* auch automatisch per WLAN machen, solange der PC läuft. |
| **Max. 3 Apps** | Mit kostenloser Apple-ID sind maximal 3 selbst installierte Apps gleichzeitig möglich. |
| **Daten aus der Web-Version** | Die alte Web-App speichert ihre Daten in Safari, die neue App hat einen eigenen Speicher. Zum Übernehmen: in der Web-Version ⚙️ → *Backup exportieren* → in der App ⚙️ → *Backup wiederherstellen*. |
| **Backups** | In der App öffnet ⚙️ → *Backup exportieren* das iOS-Teilen-Menü (Dateien-App, iCloud Drive, AirDrop …). |
| **Offline** | Alles läuft offline. Nur die PubMed-Live-Suche braucht Internet. |

## App aktualisieren
1. Auf GitHub `www/index.html` öffnen → Stift-Symbol (bearbeiten) oder neue Datei hochladen → **Commit**.
2. Der Build startet automatisch. Danach die neue `.ipa` herunterladen und per Sideloadly installieren. **Deine Daten bleiben erhalten.**

## Ohne 7-Tage-Limit (optional, später)
Mit dem **Apple Developer Program (99 €/Jahr)** kann der Build signiert und über **TestFlight** verteilt werden.
Dann gibt es kein Kabel und kein 7-Tage-Limit, und Updates kommen automatisch.
Dafür muss nur der Workflow um die Signierung erweitert werden.

---

### Was im Projekt steckt
- `www/index.html`: deine App. Tailwind wird lokal kompiliert (offline), Safe-Area für Notch/Dynamic Island ist eingebaut, das Backup läuft über das iOS-Teilen-Menü und die Daten werden zusätzlich nativ gesichert.
- `capacitor.config.json`: App-Name, Bundle-ID, dunkle Statusleiste
- `assets/icon.svg`: App-Icon (Mond + Pulslinie), daraus werden Icon & Splash erzeugt
- `.github/workflows/ios.yml`: Bauanleitung für den Cloud-Mac
