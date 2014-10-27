var Logger = {
    init: function() {

        //Default logging configuration
        this._logLevel = this.DEBUG;

        this.logLocal = true;

        //Enable this to see the debug messages from the media player
        this.logMediaplayerInternals = false;

    },

    logLocal: true,
    
    DEBUG: 5,
    INFO: 4,
    WARN: 3,
    ERROR: 2,
    FATAL: 1,
    NONE: 0,
    
    _logLevels: [
        'NONE',
        'FATAL',
        'ERROR',
        'WARN',
        'INFO',
        'DEBUG'
    ],
    
    _logLevel: 0,

    setLogLevel: function(level) {
        this._logLevel = level;
        this.log(this.INFO, 'Logging Level set to:' + this._logLevels[level] , true);
    },
    
    enableLocalLogging: function() {
        this.logToLocal = true;
        this.log(this.INFO, 'Local Logging ENABLED', true);
    },
    
    disableLocalLogging: function() {
        this.logToLocal = false;
        this.log(this.INFO, 'Local Logging ENABLED', true);
    },
    
   
    log: function(level, message, force, uniqueID) {


        if ( force || level <= this._logLevel ) {

            if ( this.logToServer === this.LOGTOSERVER || force === this.LOGTOSERVER ) {
                this.sendLogToServer(level, message, uniqueID);
            }
            else if ( this.logToServer === this.LOGTOMEDIASERVER || force === this.LOGTOMEDIASERVER ) {
                MediaBrowserService.log( level, message);
            }
            
            if ( this.logLocal ) {
                log( '[' + this._logLevels[level] + '] ' + message);
            }
            
            return true;
        }

        return false;
    },

    //Shortcuts
    debug: function(message, force, uniqueID) {
        this.log(this.DEBUG, message, force, uniqueID);
    },

    info: function(message, force , uniqueID) {
        this.log(this.INFO, message, force, uniqueID);
    },
    
    warn: function(message, force, uniqueID) {
        this.log(this.WARN, message, force, uniqueID);
    },
    
    error: function(message, force, uniqueID) {
        this.log(this.ERROR, message, force, uniqueID);
    },
    
    fatal: function(message, force, uniqueID) {
        this.log(this.FATAL, message, force, uniqueID);
    },

};

Logger.init();