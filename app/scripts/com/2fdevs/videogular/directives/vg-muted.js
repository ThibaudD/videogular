/**
 * @ngdoc directive
 * @name com.2fdevs.videogular.directive:vgMuted
 * @restrict A
 * @description
 * Optional directive for `vg-media` to add or remove muted in media files. Possible values are: "true" and "false"
 *
 */
"use strict";
angular.module("com.2fdevs.videogular")
    .directive("vgMuted",
    [function () {
        return {
            restrict: "A",
            require: "^videogular",
            link: {
                pre: function (scope, elem, attr, API) {
                    var muted;

                    scope.setMuted = function setMuted(value) {
                        if (value) {
                            API.mediaElement.attr("muted", value);
                        }
                        else {
                            API.mediaElement.removeAttr("muted");
                        }
                    };

                    if (API.isConfig) {
                        scope.$watch(
                            function () {
                                return API.config;
                            },
                            function () {
                                if (API.config) {
                                    scope.setMuted(API.config.muted);
                                }
                            }
                        );
                    }
                    else {
                        scope.$watch(attr.vgMuted, function (newValue, oldValue) {
                            if ((!muted || newValue != oldValue) && newValue) {
                                muted = newValue;
                                scope.setMuted(muted);
                            }
                            else {
                                scope.setMuted();
                            }
                        });
                    }
                }
            }
        }
    }
    ]);
