const fs = require('fs');

const pluginJson = JSON.parse(
  fs.readFileSync('plugins/munin-claude-code/.claude-plugin/plugin.json', 'utf8')
);

const pkg = {
  name: '@kalera/munin-claude-plugin',
  version: pluginJson.version,
  description: pluginJson.description || '',
  author: pluginJson.author
    ? `${pluginJson.author.name} <${pluginJson.author.email}>`
    : 'Kalera <hoang.kal@gmail.com>',
  license: pluginJson.license || 'MIT',
  repository: pluginJson.repository || 'https://github.com/3d-era/munin-for-agents',
  homepage: pluginJson.repository
    ? pluginJson.repository.replace('.git', '') + '#readme'
    : 'https://github.com/3d-era/munin-for-agents#readme',
  keywords: pluginJson.keywords || [],
  files: ['plugins/munin-claude-code'],
  main: 'plugins/munin-claude-code/.claude-plugin/plugin.json',
  publishConfig: {
    directory: 'plugins/munin-claude-code',
    linkDirectory: false,
  },
};

fs.writeFileSync('/tmp/package.json', JSON.stringify(pkg, null, 2));
console.log('Created /tmp/package.json with version:', pkg.version);
console.log('Package name:', pkg.name);