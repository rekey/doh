const {Packet} = require('dns2');


const buffer = Buffer.from('uGkBAAABAAAAAAAAB2FsaWJhYmEDY29tAAABAAE', 'base64');
const packet = Packet.parse(buffer);

console.log(packet);