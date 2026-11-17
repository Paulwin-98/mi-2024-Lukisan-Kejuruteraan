class TutorialComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.addEventListeners();
  }

  render() {
    const imageSrc = this.getAttribute('image') || ''; // Default image
    const videoSrc = this.getAttribute('video') || '';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        .container {
          position: relative;
          width: 100%;
          height: 100%;
          aspect-ratio: 5/1;
          background: black;
          border-radius: 20px;
        }
        .buttons {
          display: flex;
          width: 50%;
          margin-left: 10px;
        }
        button {
          flex: 1;
          padding: 10px 40px;
          border: none;
          cursor: pointer;
          background: rgb(223, 223, 223);
          border-radius: 15px 15px 0 0;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 10px;
        }
        .active {
          background-color: #ffc55a;
          color: black;
        }
        .inactive {
          background-color: rgb(223, 223, 223);
          color: black;
        }
        .modal {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 20px 0;
          display: none;
          justify-content: center;
          align-items: center;
        }
        .modal.open {
          display: flex;
        }
        .box {
          display: flex;
          width: 100%;
          height: 100%;
          aspect-ratio: 5/1;
          background: white;
          border-radius: 20px;
          padding: 20px 0;
          justify-content: center;
          align-items: center;
        }
        img {
          width: 90%;
          height: auto;
          max-height: 60%;
          border-radius: 10px;
        }
        video {
          width: 95%;
          height: 95%;
          max-height: 95%;
          object-fit: contain;
          border-radius: 15px;
        }

          /* Responsive Design */
        @media screen and (max-width: 1024px) { /* Tablet */


        }

        @media screen and (max-width: 768px) { /* Mobile */

        .buttons {
          display: flex;
          width: 70%;
          margin-left: 10px;
        }

        button {
          font-size: 13px;
          padding: 10px 3px;
          border-radius: 10px 10px 0 0;
        }

        .box {
          display: flex;
          width: 100%;
          height: 100%;
          border-radius: 20px;
        }

        }

      </style>
      <div class="buttons">
        <button id="btnModel" class="active">Langkah-langkah</button>
        <button id="btnTutorial" class="inactive">Tutorial</button>
      </div>
      <div class="container">
        <div class="box">
          <div>
            <img id="tutorialImage" src="${imageSrc}" alt="Tutorial Image">
          </div>
        </div> 
        <div class="modal" id="tutorialModal">
          <div class="box">
            <video controls>
              <source src="${videoSrc}" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div> 
        </div>
      </div>
    `;
  }

  addEventListeners() {
    const btnModel = this.shadowRoot.querySelector('#btnModel');
    const btnTutorial = this.shadowRoot.querySelector('#btnTutorial');
    const tutorialModal = this.shadowRoot.querySelector('#tutorialModal');

    btnModel.addEventListener('click', () => {
      tutorialModal.classList.remove('open');
      btnModel.classList.add('active');
      btnModel.classList.remove('inactive');
      btnTutorial.classList.add('inactive');
      btnTutorial.classList.remove('active');
    });

    btnTutorial.addEventListener('click', () => {
      tutorialModal.classList.add('open');
      btnTutorial.classList.add('active');
      btnTutorial.classList.remove('inactive');
      btnModel.classList.add('inactive');
      btnModel.classList.remove('active');
    });
  }

  static get observedAttributes() {
    return ['image', 'video'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'image') {
      const imgElement = this.shadowRoot.querySelector('#tutorialImage');
      if (imgElement) {
        imgElement.src = newValue;
      }
    }
  }
}

customElements.define('tutorial-component', TutorialComponent);
