"use strict";

import { parseHTML } from "/js/utils/parseHTML.js"; 
import {picturePropiaRenderer} from "/js/renderers/picturesPropias.js";

const galleryPropiaAlbumRenderer = {
    asCardGallery: function (pictures) {
		let galleryContainer = parseHTML ('<div class="album row p-2 bg-light"> </div>'); 
		for ( let picture of pictures) {
			galleryContainer.appendChild(picturePropiaRenderer.asCard(picture)); 
		}
		return galleryContainer; 
		}
	}
export { galleryPropiaAlbumRenderer };

