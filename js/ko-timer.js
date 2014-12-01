// interval global
		var intervalHandle;

		// begin timer view model
		function TimerViewModel() {
			var self = this;

			// observables
			self.ticks = ko.observable(0);
			self.minutes = ko.observable(0);
			self.seconds = ko.observable(0);
			self.tenths  = ko.observable(0);
			self.displayButton = ko.observable(false);	//reset & submit buttons toggled off by default
			self.displayStart = ko.observable(true);		//toggles start button visibility
			self.displayStop = ko.observable(false);		//toggles stop button visibility, off by default
			self.name = ko.observable("Justin");				//insert user's name

			// add leading zero if minutes < 10
			self.displaymin = ko.computed(function() {
				if (self.minutes() < 10) {
					return "0" + self.minutes() + ":";
				} else {
					return self.minutes() + ":";
				}
			}, this);

			// add leading zero if seconds < 10
			self.displaysec = ko.computed(function() {
				if (self.seconds() < 10) {
					return "0" + self.seconds() + ".";
				} else {
					return self.seconds() + ".";
				}
			}, this);

			// start timing
			// run self.tick every tenth of a second
			self.start = function() {
				intervalHandle = setInterval(self.tick, 100);
				self.displayStop(true);		//toggles stop button on
				self.displayStart(false);	//toggles start button off
			};

			// stop timing
			self.stop = function() {
				clearInterval(intervalHandle);
				self.displayButton(true);	//toggles reset & submit buttons on
				self.displayStop(false);	//toggles stop button off
			};

			// reset time
			self.reset = function() {
				self.ticks(0);
				self.minutes(0);
				self.seconds(0);
				self.tenths(0);
				self.displayButton(false);	//toggles reset & submit buttons off
				self.displayStart(true);		//toggles start button on
			};

			// on interval (every tenth of a sec)
			// increments ticks up by one then calculates tenths of seconds, seconds and minutes
			self.tick = function() {
				self.ticks(self.ticks() + 1);
				self.tenths((self.ticks() + 1)%10);
				self.minutes(Math.floor(self.ticks() / 600));
				self.seconds(Math.floor(self.ticks() / 10)%60);
			};

		};
		// end timer view model

ko.applyBindings(new TimerViewModel, document.getElementById('timer'));