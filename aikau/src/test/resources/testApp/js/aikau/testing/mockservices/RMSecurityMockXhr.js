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
        "alfresco/core/Core"], 
        function(declare, lang, array, ioQuery, MockXhr, Core) {
   
   return declare([MockXhr, Core], {

      /**
       * This sets up the fake server with all the responses it should provide.
       *
       * @instance
       */
      setupServer: function alfresco_testing_TaggingMockXhr__setupServer() {
         try
         {
            this.tags = [];
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
            this.server.respondWith("POST",
                                    /.*\/aikau\/proxy\/alfresco\/api\/node\/.*\/formprocessor/,
                                    "OK");
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
       * Simulates adding a new tag.
       *
       * @instance
       */
      addCaveat: function alfresco_testing_TaggingMockXhr__addCaveat(request) {
         var caveatName = JSON.parse(request.requestBody).name;
         var caveat = {
            id: this.generateUuid(),
            name: caveatName,
            marks: []
         };
         this.caveats.push(caveat);

         var response = {
            id: caveat.id,
            name: caveat.name,
            marks: caveat.marks
         };
         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(response));
      },

      /**
       * Simulates adding a new tag.
       *
       * @instance
       */
      addSecurityMark: function alfresco_testing_TaggingMockXhr__addSecurityMark(request) {
         var body = JSON.parse(request.requestBody);
         var caveatId = body.caveat;
         var securityMarkName = body.name;

         var securityMark = {
            id: this.generateUuid(),
            name: securityMarkName
         };

         var caveat = this.getCaveatById(caveatId);
         caveat.marks.push(securityMark);

         var response = {
            id: securityMark.id,
            name: securityMark.name
         };
         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(response));
      },

      getCaveatById: function alfresco_testing_TaggingMockXhr__getCaveatById(caveatId) {
         var foundCaveat = null;
         array.forEach(this.caveats, function(caveat) {
            if (caveat.id === caveatId)
            {
               foundCaveat = caveat;
            }
         }, this);
         return foundCaveat;
      },

      /**
       * Simulates getting the tags based on a supplied filter
       *
       * @instance
       */
      getAllCaveats: function alfresco_testing_TaggingMockXhr__getAllCaveats(request) {
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

      getAllSecurityMarks: function alfresco_testing_TaggingMockXhr__getAllSecurityMarks(request, queryString) {
         queryString = queryString.substring(1);

         var params = queryString.split("&");
         var caveatId = params[0].split("=");
         var caveatIdValue = caveatId[1];

         var targetMarks = [];
         var targetCaveat = this.getCaveatById(caveatIdValue);
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

      /**
       * Simulates the response when updating the tags on a node
       *
       * @instance
       */
      updateTags: function alfresco_testing_TaggingMockXhr__updateTags(request) {
         var nodeRef = JSON.parse(request.requestBody).prop_cm_taggable;
         var response = {
             persistedObject: nodeRef,
             message: "Successfully persisted form for item [node]" + nodeRef
         };
         request.respond(200, {
            "Content-Type": "application/json;charset=UTF-8"
         }, JSON.stringify(response));
      }
   });
});
