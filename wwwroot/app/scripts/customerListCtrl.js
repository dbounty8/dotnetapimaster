'use strict';
angular.module('CustomerApp')
.controller('CustomerListCtrl', ['$scope', '$location', 'CustomerListSvc', function ($scope, $location, CustomerListSvc) {
    $scope.error = "";
    $scope.loadingMessage = "Loading...";
    $scope.CustomerList = null;
    $scope.editingInProgress = false;
    $scope.newCustomerName = "";


    $scope.editInProgressCustomer = {
        name: "",
        isComplete: false,
        id: 0
    };

    

    $scope.editSwitch = function (Customer) {
        Customer.edit = !Customer.edit;
        if (Customer.edit) {
            $scope.editInProgressCustomer.name = Customer.name;
            $scope.editInProgressCustomer.id = Customer.id;
            $scope.editInProgressCustomer.isComplete = Customer.isComplete;
            $scope.editingInProgress = true;
        } else {
            $scope.editingInProgress = false;
        }
    };

    $scope.populate = function () {
        CustomerListSvc.getItems().success(function (results) {
            $scope.CustomerList = results;
            $scope.loadingMessage = "";
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.delete = function (id) {
        CustomerListSvc.deleteItem(id).success(function (results) {
            $scope.loadingMessage = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.update = function (Customer) {
        $scope.editInProgressCustomer.isComplete = Customer.isComplete;
        CustomerListSvc.putItem($scope.editInProgressCustomer).success(function (results) {
            $scope.loadingMsg = "";
            $scope.populate();
            $scope.editSwitch(Customer);
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMessage = "";
        })
    };
    $scope.add = function () {
        if ($scope.editingInProgress) {
            $scope.editingInProgress = false;
        }
        CustomerListSvc.postItem({
            'Name': $scope.newCustomerName,
            'IsComplete': false
        }).success(function (results) {
            $scope.loadingMsg = "";
            $scope.newCustomerName = "";
            $scope.populate();
        }).error(function (err) {
            $scope.error = err;
            $scope.loadingMsg = "";
        })
    };

}]);
