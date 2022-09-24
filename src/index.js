gun = Gun(['http://localhost:8765/gun', 'https://gun-manhattan.herokuapp.com/gun']);
copy = gun.get('test').get('paste');
paste.oninput = () => { copy.put(paste.value) };
copy.on((data) => { paste.value = data });
console.log("ddddsfdsjbfsdbfkjsdbfbsdkjbfjksdbjfkd");
