import axios from 'axios';

const baseUrl = 'api.congress.gov';
const apiKey = 'zIIHsQU6UlUrAeMZP0NFbATS5sKNcx0AipwzQpAM';

let membersJson = {};
axios.post(`${baseUrl}/member`, {params: });