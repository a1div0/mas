function checkbox__style_check(description, block) {

    let elem2 = document.createElement('div');
    elem2.className = 'checkbox_v';
    elem2.innerHTML = '<svg width="24px" height="24px" viewBox="0 0 24 24"><path d="M 3 0 L 19 0 C 20.65685424949238 1.0145306266472667e-16 22 1.3431457505076199 22 3 L 22 19 C 22 20.65685424949238 20.65685424949238 22 19 22 L 3 22 C 1.3431457505076203 22 2.0290612532945335e-16 20.65685424949238 0 19 L 0 3 C -2.0290612532945335e-16 1.3431457505076203 1.3431457505076199 3.0435918799418e-16 3 0 Z" stroke-width="2" stroke="#000000" fill="none" selected="true" transform="matrix(1 0 0 1 0.960788 1.03335)"></path><polyline points="4 10 10 18 20 6"></polyline></svg>';
    block.appendChild(elem2);

}

checkbox__AddStyle('check_blue', checkbox__style_check);
