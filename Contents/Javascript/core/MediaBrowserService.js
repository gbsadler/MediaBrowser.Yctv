var MediaBrowserService = {
    init: function() {
        Logger.info( $_('init', $_('media_service')));
        
        this.state = Config.STATE_INIT;

        if ( ! Config.ready() ) {
            Logger.error( $_('no_config', $_('app_title'), $_('media_service')));
            return;
        }

	KONtx.speedtest.profileConnection(this._saveBandwidth.bindTo(this), null, this._speedTestError.bindTo(this));

    //Test connection to MB
    apiClient = new MediaBrowserTv.MediaBrowser.ApiClient("http://eric-office:8096", "MediaBrowserTv", Config.currentVersion, tv.system.OEM, tv.system.deviceId, Config.Capabilities);

    apiClient.getPublicSystemInfo().done(function(){Logger.debug("====== in done"); state = Config.STATE_READY; Logger.debug("*********Service state is: "+state);}).fail(function(){state = Config.STATE_ERROR; Logger.error("Error connecting to MB")});

    },
    
    state: Config.STATE_INIT,
    _stateChangeListeners: {},
    serverName: null,
    serverInfo: {},
    _currentMedia: {},
    sessionID: null,
    apiClient: null,

    _saveBandwidth: function(speed) {
        Logger.debug('Detected Connection Speed: ' + speed);
        Config.set('bandwidth', speed);
    },
	
    _speedTestError: function(xhr) {
        Logger.debug('Bandwidth detection error: ', $dump(xhr,3));
        Config.set('bandwidth', 1);
    },

    
    //implement a simple event listener
    addStateChangeListener: function(callback, objectKey) {
        Logger.debug( 'Registering for State Change' );

        if (callback && callback.call) {
            this._stateChangeListeners[objectKey] = callback;
        }

        Logger.debug( $dump(this._stateChangeListeners) );
    },
    
    removeStateChangeListener: function(objectKey) {
        Logger.debug( 'UNRegistering for State Change' );
        var property;

        //This doesn't seem to work in this version of JS
//        delete this._stateChangeListeners[objectKey];

        //To minimize garbage creation, let's just set anything matching to undefined
        for ( property in this._stateChangeListeners ) {
            if ( this._stateChangeListeners.hasOwnProperty(property) ) {
                if ( property === objectKey ) {
                    this._stateChangeListeners[property]  = undefined;
                }
            }
        }

        Logger.debug( $dump(this._stateChangeListeners) );

    },

    resetStateChangeListener: function() {
        var property;
        
        for ( property in this._stateChangeListeners ) {
            if ( this._stateChangeListeners.hasOwnProperty(property) ) {
                this._stateChangeListeners[property]  = undefined;
            }
        }
    },

    _fireOnStateChange: function(event) {
        Logger.debug('Firing State Change Callbacks');
        var key;

        for ( key in this._stateChangeListeners ) {
            if (this._stateChangeListeners.hasOwnProperty(key)) {
                if ( this._stateChangeListeners[key] && this._stateChangeListeners[key].call) {
                    this._stateChangeListeners[key](event);
                }
            }
        }
        
    },

    getCurrentMedia: function() {
        return this._currentMedia;
    },
    

};