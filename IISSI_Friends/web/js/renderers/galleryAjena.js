"use strict";

import { parseHTML } from "/js/utils/parseHTML.js"; 
import { pictureAjenaRenderer} from "/js/renderers/picturesAjenas.js"; 


const galleryAjenaAlbumRenderer = {
	asCardGallery: function (pictures) {
		let galleryContainer = parseHTML ('<div class="album row p-2 bg-light"> </div>'); 
		for ( let picture of pictures) {
			galleryContainer.appendChild(pictureAjenaRenderer.asCard(picture)); 
		}
		return galleryContainer; 
		}
	}
export { galleryAjenaAlbumRenderer };
