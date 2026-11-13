// Ergänzt die Info.plist des iOS-Projekts (läuft im GitHub-Actions-Build nach `npx cap add ios`).
// Registriert das URL-Schema trainingscoach://, über das Strava nach der Anmeldung in die App zurückspringt.
import { execSync } from 'node:child_process';

const PLIST = 'ios/App/App/Info.plist';
const pb = (cmd, ignoreError = false) => {
  try {
    execSync(`/usr/libexec/PlistBuddy -c "${cmd}" "${PLIST}"`, { stdio: 'inherit' });
  } catch (e) {
    if (!ignoreError) throw e;
  }
};

pb('Delete :CFBundleURLTypes', true);
pb('Add :CFBundleURLTypes array');
pb('Add :CFBundleURLTypes:0 dict');
pb('Add :CFBundleURLTypes:0:CFBundleURLName string com.schlafcoach.trainingscoach');
pb('Add :CFBundleURLTypes:0:CFBundleURLSchemes array');
pb('Add :CFBundleURLTypes:0:CFBundleURLSchemes:0 string trainingscoach');

console.log('URL-Schema trainingscoach:// registriert.');

// Auto-Backups im Dokumente-Ordner der App in der Dateien-App sichtbar machen
// („Auf meinem iPhone → Trainingscoach“; per Kabel auch am PC über iTunes erreichbar).
for (const key of ['UIFileSharingEnabled', 'LSSupportsOpeningDocumentsInPlace']) {
  pb(`Delete :${key}`, true);
  pb(`Add :${key} bool true`);
}
console.log('Dateien-App-Freigabe aktiviert.');
