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
 * <p>Extends the [VerticalWidgets]{@link module:alfresco/layout/VerticalWidgets} to mixin in the
 * [_AlfDndDocumentUploadMixin]{@link module:alfresco/documentlibrary/_AlfDndDocumentUploadMixin}
 * on order to provide a simple way the user can drag-and-drop a file anywhere within the browser
 * view port to upload to the current displayed location. This relies on the current location 
 * being defined by a widget such as the 
 * [AlfDocumentList]{@link module:alfresco/documentlibrary/AlfDocumentList} also being present in 
 * the page that will set the current location to upload to. It also relies on the 
 * [UploadService]{@link module:alfresco/services/UploadService} being present on the page to 
 * process the upload requests.</p>
 * <p>If the widget is not intended to be used to contain all the widgets on the page then
 * [fullScreenDndHighlight]{@link module:alfresco/layout/UploadContainer#fullScreenDndHighlight}
 * can be configured to be false and the drag-and-drop upload highlight will only be applied
 * to the area containing the child widgets.</p>
 * 
 * @module alfresco/layout/VerticalWidgets
 * @extends module:alfresco/layout/VerticalWidgets
 * @mixes module:alfresco/documentlibrary/_AlfDndDocumentUploadMixin
 * @author Dave Draper
 * @since 1.0.42
 */
define(["dojo/_base/declare",
        "alfresco/layout/VerticalWidgets",
        "alfresco/documentlibrary/_AlfDndDocumentUploadMixin",
        "dojo/dom-style",
        "dojo/window"], 
        function(declare, VerticalWidgets, _AlfDndDocumentUploadMixin, domStyle, win) {
   
   return declare([VerticalWidgets, _AlfDndDocumentUploadMixin], {
      
      /**
       * This indicates whether or not the drag-and-drop highlight should fully consume the browser
       * view port. This can be overridden if this layout widget does not occupy the entire page.
       * 
       * @instance
       * @type {boolean}
       * @default
       */
      fullScreenDndHighlight: true,

      /**
       * 
       * @instance
       */
      postCreate: function alfresco_core_ProcessWidgets__postCreate() {
         this.inherited(arguments);
         this.subscribeToCurrentNodeChanges(this.domNode);
         this.addUploadDragAndDrop(this.domNode);
      },

      /**
       * If [fullScreenDndHighlight]{@link module:alfresco/layout/UploadContainer#fullScreenDndHighlight} is
       * configured to be false then this overrides the 
       * [mixed in function]{@link module:alfresco/documentlibrary/_AlfDndDocumentUploadMixin#setDndHighlightDimensions}
       * to ensure that the drag-and-drop upload highlight is fixed to fill the browser view port.
       * 
       * @instance
       */
      setDndHighlightDimensions: function alfresco_documentlibrary__AlfDndDocumentUploadMixin__setDndHighlightDimensions() {
         if (this.fullScreenDndHighlight)
         {
            var viewPortDimensions = win.getBox();
            domStyle.set(this.dragAndDropOverlayNode, {
               position: "fixed",
               height: viewPortDimensions.h + "px",
               width: viewPortDimensions.w + "px",
               top: 0,
               left: 0,
               boxSizing: "border-box"
            });
         }
         else
         {
            this.inherited(arguments);
         }
      }
   });
});