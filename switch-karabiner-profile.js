let profileName = null;

let args = process.argv.splice(2);
if (args && args.length) {
  profileName = args[0];
}
if (!profileName) {
  console.error('profile name is null');
  process.exit(1);
}

const os = require('os');
let configPath = `${os.homedir()}/.config/karabiner/karabiner.json`;
let config = require(configPath);

if (config.profiles.findIndex(function (profile) {
  return profile.name === profileName;
}) === -1) {
  console.error(`profile name [${profileName}] not found`);
  process.exit(1);
}

let changed = false;
config.profiles.forEach(function (profile) {
  const selected = profile.name === profileName;
  if (profile.selected !== selected) {
    profile.selected = selected;
    changed = true;
  }
});

if (!changed) {
  console.info('profile not changed');
  process.exit(0);
}

const fs = require('fs');
fs.writeFileSync(configPath, JSON.stringify(config, null, '\t'));
