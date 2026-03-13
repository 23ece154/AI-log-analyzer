function sanitizeLog(log){

// IP Address
log = log.replace(/\b\d{1,3}(\.\d{1,3}){3}\b/g,"[IP]")

// Email
log = log.replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g,"[EMAIL]")

// Password
log = log.replace(/password\s*[:=]\s*[\S]+/gi,"password=[PASSWORD]")

// API Keys
log = log.replace(/api[_-]?key\s*[:=]\s*[\S]+/gi,"[API_KEY]")

// Credit Card
log = log.replace(/\b\d{4}-\d{4}-\d{4}-\d{4}\b/g,"[CARD_NUMBER]")

// SSN
log = log.replace(/\b\d{3}-\d{2}-\d{4}\b/g,"[SSN]")

// JWT Tokens
log = log.replace(/eyJ[a-zA-Z0-9._-]+/g,"[JWT_TOKEN]")

// File Paths
log = log.replace(/\/[^\s]+/g,"[PATH]")

return log
}

module.exports = sanitizeLog