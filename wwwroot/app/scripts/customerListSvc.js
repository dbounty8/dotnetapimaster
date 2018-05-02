'use strict';
angular.module('CustomerApp')
.factory('CustomerListSvc', ['$http', function ($http) {

    $http.defaults.useXDomain = true;
    delete $http.defaults.headers.common['X-Requested-With']; 

    return {
        getItems : function(){
            return $http.get(apiEndpoint + '/api/Customer');
        },
        getItem : function(id){
            return $http.get(apiEndpoint + '/api/Customer/' + id);
        },
        postItem : function(item){
            return $http.post(apiEndpoint + '/api/Customer', item);
        },
        putItem : function(item){
            return $http.put(apiEndpoint + '/api/Customer/' + item.id, item);
        },
        deleteItem : function(id){
            return $http({
                method: 'DELETE',
                url: apiEndpoint + '/api/Customer/' + id
            });
        }
    };
}]);