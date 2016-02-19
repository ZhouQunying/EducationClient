'use strict';

angular.module('projectApp.auth', [
  'projectApp.constants',
  'projectApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
