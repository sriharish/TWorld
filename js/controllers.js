(function() {
    'use strict';
    
    //Module Definitions
    var mainModule = angular.module('mainModule', ['ngMaterial']);
  
    //Controller Definitions
    mainModule.controller('listController', function($scope) {
      $scope.isOpen = false;
      $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'down'
      };
    });
})();

