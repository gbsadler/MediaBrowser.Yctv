(function (app) {

    function myStore(defaultObject) {

        var self = this;
        self.localData = {};

        var isDefaultAvailable;

        if (defaultObject) {
            try {
                defaultObject.set('_test', '0');
                isDefaultAvailable = true;
            } catch (e) {

            }
        }

        self.setItem = function (name, value) {

            if (isDefaultAvailable) {
                defaultObject.set(name, value);
            } else {
                self.localData[name] = value;
            }
        };

        self.getItem = function (name) {

            if (isDefaultAvailable) {
                return defaultObject.get(name);
            }

            return self.localData[name];
        };

        self.removeItem = function (name) {

            if (isDefaultAvailable) {
                defaultObject.remove(name);
            } else {
                self.localData[name] = null;
            }
        };
    }

    Logger.debug("Creating store...");
    app.store = new myStore(Config);
    Logger.debug("Store created");

})(MediaBrowserTv);