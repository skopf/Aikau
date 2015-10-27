/**
 * Copyright (C) 2005-2015 Alfresco Software Limited.
 *
 * This file is part of Alfresco
 *
 * Alfresco is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Alfresco is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Alfresco. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 *
 * @author Dave Draper
 */
define(["dojo/_base/declare",
        "dojo/_base/lang",
        "dojo/_base/array",
        "dojo/io-query",
        "aikauTesting/MockXhr",
        "alfresco/core/Core",
        "alfresco/forms/controls/MultiSelectInput"], 
        function(declare, lang, array, ioQuery, MockXhr, Core) {
   
   return declare([MockXhr, Core], {

      /**
       * This sets up the fake server with all the responses it should provide.
       *
       * @instance
       */
      setupServer: function alfresco_testing_RMSecurityMockXhr__setupServer() {
         try
         {
            this.server.respondWith("POST",
                                    "/aikau/proxy/alfresco/addCaveat",
                                    lang.hitch(this, this.addCaveat));
            this.server.respondWith("POST",
                                    "/aikau/proxy/alfresco/addSecurityMark",
                                    lang.hitch(this, this.addSecurityMark));
            this.server.respondWith("POST",
                                    /\/proxy\/alfresco\/api\/node\/workspace\/(.*)/,
                                    lang.hitch(this, this.updateTags));
            this.server.respondWith("GET",
                                    "/aikau/proxy/alfresco/getAllCaveats",
                                    lang.hitch(this, this.getAllCaveats));
            this.server.respondWith("GET",
                                    /\/aikau\/proxy\/alfresco\/getAllSecurityMarks(.*)/,
                                    lang.hitch(this, this.getAllSecurityMarks));
            this.server.respondWith("DELETE",
                                    /\/aikau\/proxy\/alfresco\/deleteCaveat(.*)/,
                                    lang.hitch(this, this.deleteCaveat));
            this.server.respondWith("DELETE",
                                    /\/aikau\/proxy\/alfresco\/deleteSecurityMark(.*)/,
                                    lang.hitch(this, this.deleteSecurityMark));
            this.server.respondWith("GET",
                                    /\/aikau\/proxy\/alfresco\/getUsersAndGroups(.*)/,
                                    lang.hitch(this, this.getUsersAndGroups));

            this.alfSubscribe("ALF_RM_APPLY_CAVEATS_DIALOG", lang.hitch(this, this.showApplyCaveatsDialog));
         }
         catch(e)
         {
            this.alfLog("error", "The following error occurred setting up the mock server", e);
         }
         this.alfPublish("ALF_MOCK_XHR_SERVICE_READY", {});
      },

      /**
       * An array of tags managed in memory by this mock XHR handler.
       * 
       * @instance
       * @type {object[]}
       * @default
       */
      caveats: null,

      /**
       * Simulates adding a new caveat.
       *
       * @instance
       */
      addCaveat: function alfresco_testing_RMSecurityMockXhr__addCaveat(request) {
         var caveatName = JSON.parse(request.requestBody).name;
         var caveat = {
            caveatId: this.generateUuid(),
            name: caveatName,
            marks: [],
            markCount: 0,
            userCount: 0,
            groupCount: 0
         };
         this.caveats.push(caveat);

         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(caveat));
      },

      /**
       * Simulates adding a new security mark to a caveat.
       *
       * @instance
       */
      addSecurityMark: function alfresco_testing_RMSecurityMockXhr__addSecurityMark(request) {
         var body = JSON.parse(request.requestBody);
         var caveatId = body.caveatId;
         var securityMarkName = body.name;

         var securityMark = {
            markId: this.generateUuid(),
            name: securityMarkName,
            access: body.access,
            userCount: 0,
            groupCount: 0
         };

         var caveat = this.getCaveatById(caveatId);
         caveat.marks.push(securityMark);

         
         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(securityMark));
      },

      /**
       * Finds and returns an existing caveat based on its id
       *
       * @instance
       */
      getCaveatById: function alfresco_testing_RMSecurityMockXhr__getCaveatById(caveatId) {
         var foundCaveat = null;
         array.forEach(this.caveats, function(caveat) {
            if (caveat.caveatId === caveatId)
            {
               foundCaveat = caveat;
            }
         }, this);
         return foundCaveat;
      },

      /**
       * Simulates getting all the caveats
       *
       * @instance
       */
      getAllCaveats: function alfresco_testing_RMSecurityMockXhr__getAllCaveats(request) {
         if (!this.caveats)
         {
            this.caveats = [];
         }

         var response = {
            items: this.caveats
         };

         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(response));
      },

      /**
       * Simulates getting all the security marks for a caveat
       *
       * @instance
       */
      getAllSecurityMarks: function alfresco_testing_RMSecurityMockXhr__getAllSecurityMarks(request, queryString) {
         queryString = queryString.substring(1);

         var queryObject = ioQuery.queryToObject(queryString);
         var targetCaveat = this.getCaveatById(queryObject.caveatId);
         var targetMarks = [];
         if (targetCaveat)
         {
            targetMarks = targetCaveat.marks;
         }

         var response = {
            items: targetMarks
         };

         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(response));
      },

      usersAndGroups: [
         {
            name: "Peter Griffin",
            type: "USER"
         },
         {
            name: "Chris Griffin",
            type: "USER"
         },
         {
            name: "Glenn Quagmire",
            type: "USER"
         },
         {
            name: "Joe Swanson",
            type: "USER"
         },
         {
            name: "Griffins",
            type: "GROUP"
         }
      ],

      /**
       * Simulates getting all the security marks for a caveat
       *
       * @instance
       */
      getUsersAndGroups: function alfresco_testing_RMSecurityMockXhr__getUsersAndGroups(request, queryString) {
         queryString = queryString.substring(1);

         var queryObject = ioQuery.queryToObject(queryString);
         
         var filteredResults = this.usersAndGroups;
         if (queryObject.usersOrGroups && queryObject.usersOrGroups !== "BOTH")
         {
            var type = queryObject.usersOrGroups;
            filteredResults = array.filter(filteredResults, function(item) {
               return item.type === type;
            });
         }

         if (queryObject.name)
         {
            var target = queryObject.name.toLowerCase();
            filteredResults = array.filter(filteredResults, function(item) {
               return item.name.toLowerCase().indexOf(target) !== -1;
            });
         }

         var response = {
            items: filteredResults
         };

         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(response));
      },

      /**
       * Simulates deletion of a caveat
       *
       * @instance
       */
      deleteCaveat: function alfresco_testing_RMSecurityMockXhr__deleteCaveat(request, queryString) {
         queryString = queryString.substring(1);
         var queryObject = ioQuery.queryToObject(queryString);

         this.caveats = array.filter(this.caveats, function(caveat) {
            return caveat.caveatId !== queryObject.caveatId;
         });
         var response = {
            success: true
         };

         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(response));
      },

      /**
       * Simulates deletion of a security mark
       *
       * @instance
       */
      deleteSecurityMark: function alfresco_testing_RMSecurityMockXhr__deleteCaveat(request, queryString) {
         queryString = queryString.substring(1);
         var queryObject = ioQuery.queryToObject(queryString);
         var targetCaveat = this.getCaveatById(queryObject.caveatId);

         targetCaveat.marks = array.filter(targetCaveat.marks, function(mark) {
            return mark.markId !== queryObject.markId;
         });
         var response = {
            success: true
         };

         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(response));
      },

      /**
       * Creates a dialog for the applying caveats
       *
       * @instance
       */
      showApplyCaveatsDialog: function alfresco_testing_RMSecurityMockXhr__showApplyCaveatsDialog(request) {
         
         var fields = [];
         array.forEach(this.caveats, function(caveat) {
            var fieldWidget = {
               name: "alfresco/forms/controls/MultiSelectInput",
               config: {
                  name: caveat.caveatId,
                  label: caveat.name,
                  optionsConfig: {
                     fixed: caveat.marks,
                     queryAttribute: "name",
                     valueAttribute: "caveatId",
                     labelAttribute: "name"
                  }
               }
            };
            fields.push(fieldWidget);
         }, this);

         this.alfPublish("ALF_CREATE_FORM_DIALOG_REQUEST", {
            dialogId: "APPLY_CAVEATS",
            dialogTitle: "Apply Caveats",
            formSubmissionTopic: "ALF_CRUD_UPDATE",
            formSubmissionPayloadMixin: {
               url: "applyCaveats"
            },
            formSubmissionGlobal: true,
            widgets: fields
         }, true);

      }
   });
});
