'use strict'

const horizon = new Horizon()
const listings = horizon('listings')

const app = new Vue({
	el: '#vue-app',
	template: `
		<div class="container">
	  	<div class="col-sm-6">
	      <div class="panel panel-default">
	        <div class="panel-heading">
	          <h3>Add a listing</h3>
	        </div>
	        <div class="panel-body">
	          <div class="form-group">
	            <input autofocus="autofocus" class="form-control" placeholder="listing Name" v-model="listing.name">
	          </div>
	          <div class="form-group">
	            <input class="form-control" placeholder="listing Description" v-model="listing.description" v-on:keyup.enter="addListing">
	          </div>
	          <button class="btn btn-primary" v-on:click="addListing">Submit</button>
	        </div>
	      </div>
	    </div>
	    <div class="col-sm-6">
	      <div class="list-group">
	        <a href="#" class="list-group-item" v-for="listing of listings" key="listing.id">
	          <h4 class="list-group-item-heading">
	            <i class="glyphicon glyphicon-bullhorn"></i> 
	            {{ listing.name }}
	          </h4>
	          <h5>
	            <i class="glyphicon glyphicon-calendar" v-if="listing.date"></i> 
	            {{ listing.date }}
	          </h5>
	          <p class="list-group-item-text" v-if="listing.description">{{ listing.description }}</p>
	          <button class="btn btn-xs btn-danger" v-on:click="deleteListing(listing)">Delete</button>
	        </a>
	      </div>
	    </div>
	  </div>
	`,
	data: {
		listing: {name: '', description: '' },
		listings: []
	},
	created() {
		listings.order('date','descending')
		// .limit(10)
		.watch()
		.subscribe(allListings => {
        this.listings = [...allListings]
      },
      error => console.log(error)
    )
	},
	methods: {
		addListing() {
	    if(this.listing.name) {
	    	listings.store({
	    		 name: this.listing.name,
	    		 description: this.listing.description,
	    		 date: this.formatDate(new Date())
	    	}).subscribe(
	    	// result => console.log(result),
	    	result => console.log(result),
	    	error => console.log(error)
	    	)
	      this.listing = {name: '', description: '' };
	    }
	  },
		formatDate(d) {
			var year = d.getFullYear();
			var month = this.addLeadingZero(d.getMonth());
			var day = this.addLeadingZero(d.getDay());
			var hours = this.addLeadingZero(d.getHours());
			var minutes = this.addLeadingZero(d.getMinutes());
			var seconds = this.addLeadingZero(d.getSeconds());
			return year + '-' + month + '-' + day+ ' ' + hours + ':' + minutes + ':' + seconds
		},
		addLeadingZero(n) {
			return n < 10 ? '0'+n : ''+n
		},
	  deleteListing(listing) {
	  	listings.remove(listing)
	  }
	}
});