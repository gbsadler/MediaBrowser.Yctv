var MediaBrowserService = {
    init: function() {
        Logger.info( $_('init', $_('media_service')));
        
        this.state = Config.STATE_INIT;

        if ( ! Config.ready() ) {
            Logger.error( $_('no_config', $_('app_title'), $_('media_service')));
            return;
        }

        //Check Connectivity
        this._pingServer();

	KONtx.speedtest.profileConnection(this._saveBandwidth.bindTo(this), null, this._speedTestError.bindTo(this));

    },
    
    state: Config.STATE_INIT,
    _stateChangeListeners: {},
    serverName: null,
    serverInfo: {},
    _currentMedia: {},
    sessionID: null,

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