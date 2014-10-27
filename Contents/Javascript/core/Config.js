var Config = {
    initialize: function() {
        Logger.debug( 'Initializing Config' );
        this._loadStoredConfig();

        Logger.debug( JSON.stringify(this._config) );
        this.set('configVersion', this.configVersion);

        //Setup defaults
        if ( ! this.get( 'serverPort' ) ) {
            Logger.warn( 'MB Server Port not set. Setting to default.' );
            this.set( 'serverPort', this.DEFAULTPORT);
        }

        if ( ! this.get( 'videoResolution' ) ) {
            Logger.warn( 'Video Resolution not set. Setting to default.' );
            this.set( 'videoResolution', this.DEFAULTVIDEORESOLUTIONINDEX);
        }

        if ( ! this.get( 'videoQuality' ) ) {
            Logger.warn( 'Video Quality not set. Setting to default: ' + Config.DEFAULTVIDEOQUALITY);
            this.set( 'videoQuality', this.DEFAULTVIDEOQUALITY);
        }

        if ( this._config.activerwff !== undefined ) {
            this.set('activerwff', 0);
        }

        if ( ! this._config.rwffSpeed ) {
            this.set('rwffSpeed', Config.DEFAULTRWFFSPEED);
        }

        if ( ! this._config.instantReplay ) {
            this.set('instantReplay', Config.DEFAULTINSTANTREPLAY);
        }

        if ( this._config.animate === undefined ) {
            this.set('animate', true);
        }

        if ( ! this._config.localQuality ) {
            Logger.debug( 'localQuality not set. Setting to default.');
            this.set('localQuality', this.QUALITYAUTO);
        }

        if ( ! this.get( 'localResolution' ) ) {
            Logger.warn( 'Local Resolution not set. Setting to default.' );
            this.set( 'localResolution', this.DEFAULTVIDEORESOLUTIONINDEX);
        }

        if ( ! this._config.remoteQuality ) {
            Logger.debug( 'remoteQuality not set. Setting to default.');
            this.set('remoteQuality', this.QUALITYAUTO);

        }

        if ( ! this.get( 'remoteResolution' ) ) {
            Logger.warn( 'Remote Resolution not set. Setting to default.' );
            this.set( 'remoteResolution', this.DEFAULTREMOTERESOLUTIONINDEX);
        }

    },
    
    _config: {},
    
    appMajorVersion: '0',
    appMinorVersion: '0',
    appBuildVersion: '1',
    configVersion: 1,
        
    MBLINK: 'http://MediaBrowser.Tv',
    
    
    AVAILABLERESOLUTIONS: [
        { value : '0', label : '320p',  width : '480',  height : '320'  },
        { value : '1', label : '480p',  width : '854',  height : '480'  },
        { value : '2', label : '720p',  width : '1280', height : '720'  },
        { value : '3', label : '1080p', width : '1920', height : '1080' }
    ],
    
    SUPPORTEDCONTAINERS:  [ 'mp4', 'wmv', 'rm', 'asf', 'mkv', 'avi' ],
    SUPPORTEDVIDEOCODECS: [ 'h264', 'vc1', 'rv40', 'mpeg4', 'mpeg2video'  ],
    SUPPORTEDAUDIOCODECS: [ 'aac', 'ac3', 'wma', 'wmapro', 'cook', 'mp3', 'dca'  ],
    SUPPORTEDPASSTHROUGHAUDIOCODECS: [ 'dca' ],
    
    DEFAULTVIDEORESOLUTIONINDEX: 2,
    DEFAULTVIDEOQUALITY: 8,

    DEFAULTREMOTERESOLUTIONINDEX: 2,
    
    DEFAULTIP: '192.168.1.xxx',
    DEFAULTPORT: 8096,
    DEFAULTRWFFSPEED: '2',
    DEFAULTINSTANTREPLAY: '6',
    
    THUMBWIDTH: 130,
    THUMBHEIGHT: 200,
    THUMBFORMAT: 'jpeg',
    PHOTOBGCOLOR: '363636',
    SECTIONTHUMBWIDTH: 80,
    SECTIONTHUMBHEIGHT: 80,
    SECTIONTHUMBFORMAT: 'png',
    EPISODETHUMBWIDTH: 130,
    EPISODETHUMBHEIGHT: 113,
    SHOWBANNERWIDTH: 379,
    SHOWBANNERHEIGHT: 79,
    BANNERTHUMBFORMAT: 'jpg',
    
    IMAGESROOT: 'Assets/960x540/',
    
    VIDEOMAXWIDTH: '1080',
    VIDEOMAXHEIGHT: '1920',
    
    LIBRARYSEASONSCOLUMNS: 6,
    LIBRARYSECTIONCOLUMNS: 6,
    LIBRARYSECONDARYCOLUMNS: 8,
    LIBRARYEPISODECOLUMNS: 6,
    LIBRARYSHOWCOLUMNS: 6,
    LIBRARYMEDIACOLUMNS: 6,
    LIBRARYICON: 'Assets/960x540/mediabrowser_icon_small.png',


    LIBRARYPAGESCACHED: 3,
    
    STATE_INIT: 0,
    STATE_NOTREADY: -1,
    STATE_READY: 1,
    STATE_ERR: -255,
    STATE_TIMEOUT: -254,
    
    DEFAULTTIMETEXT: '00:00:00',

    
    generateUniqueID: function() {
        
        var id = Math.random().toString(36).slice(2);
        Logger.debug( 'Unique ID generated: ' + id);
        return id;
    },

    //Verify that we have the config we need to get going
    ready: function() {
        if (this._config.serverIP) {
            return true;
        }
        
        return false;
    },
    
    reset: function() {
        Logger.warn('Resetting all configuration options to default values.');

        this._config = {};
        this._saveStoredConfig();
        this.initialize();
    },
    
    _loadStoredConfig: function() {
        Logger.debug( 'Loading stored config' );
        
        var tmpConfig = currentAppConfig.get( 'MediaBrowserTvStoredConfig' );
        if (tmpConfig) {
            this._config = JSON.parse(tmpConfig);
        }
    },

    _saveStoredConfig: function() {
       Logger.debug( 'Saving stored config' );
       
       currentAppConfig.set( 'MediaBrowserTvStoredConfig', JSON.stringify(this._config) );
    },
    
    set: function(key, value) {
        this._config[key] = value;
        this._saveStoredConfig();
    },
    
    get: function(key) {
        return this._config[key];
    }

    
};

Config.initialize();