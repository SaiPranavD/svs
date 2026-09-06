import https from 'https';

const options = {
  hostname: 'api.github.com',
  path: '/repos/SaiPranavD/svs/actions/runs?per_page=3',
  headers: { 'User-Agent': 'Node.js' }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      json.workflow_runs.forEach(r => {
        console.log(`${r.name} | ${r.status} | ${r.conclusion} | ${r.head_commit?.message?.split('\n')[0]}`);
      });
    } catch(e) {
      console.log('Error parsing response:', e.message);
    }
  });
});
