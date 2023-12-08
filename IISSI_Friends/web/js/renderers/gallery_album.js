"use strict";

import { parseHTML } from "/js/utils/parseHTML.js"; 
import { pictureRenderer} from "/js/renderers/pictures.js"; 

const galleryAlbumRenderer = {
	asCardGallery: function (pictures) {
		let galleryContainer = parseHTML ('<div class="album row p-2 bg-light"> </div>'); 
		for ( let picture of pictures) {
			galleryContainer.appendChild(pictureRenderer.asCard(picture)); 
		}
		return galleryContainer; 
		}
	}
export { galleryAlbumRenderer };
